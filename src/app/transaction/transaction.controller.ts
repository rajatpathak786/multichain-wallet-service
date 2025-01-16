import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { IRequest } from '@lib/interface';
import { WebAuthGuard } from '@guards/webAuth.guards';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  InvalidTokenResponse,
  TransactionFailedInsufficientFunds,
  TransferSuccess,
} from '@lib/responses';

@Controller('transaction')
@UseGuards(WebAuthGuard)
@ApiBearerAuth()
@ApiTags('Transaction Apis')
@ApiUnauthorizedResponse({
  description: `Invalid Token`,
  type: InvalidTokenResponse,
})
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOkResponse({
    description: `Transaction Success`,
    type: TransferSuccess,
  })
  @ApiInternalServerErrorResponse({
    description: `Insufficient Funds`,
    type: TransactionFailedInsufficientFunds,
  })
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() request: IRequest,
  ) {
    return this.transactionService.create(
      createTransactionDto,
      request.walletAddress,
    );
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
