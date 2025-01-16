import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WebAuthGuard } from 'src/guards/webAuth.guards';
import { IRequest } from '@lib/interface';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateWalletBadReq,
  CreateWalletSuccess,
  FetchWalletBalanceNative,
  FetchWalletDetails,
  InvalidTokenResponse,
} from '@lib/responses';

@Controller('wallet')
@ApiBearerAuth()
@ApiTags('Wallet Apis')
@ApiUnauthorizedResponse({
  description: `Invalid Token`,
  type: InvalidTokenResponse,
})
@UseGuards(WebAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOkResponse({
    description: `Create Wallet Success`,
    type: CreateWalletSuccess,
  })
  @ApiBadRequestResponse({
    description: `Validation Error`,
    type: CreateWalletBadReq,
  })
  create(@Body() createWalletDto: CreateWalletDto, @Req() request: IRequest) {
    return this.walletService.create(createWalletDto, request.userId);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get('/details')
  @ApiOkResponse({
    description: `Fetch Wallet Details`,
    type: FetchWalletDetails,
  })
  findOne(@Req() request: IRequest) {
    return this.walletService.findOne(request.walletAddress);
  }

  @Get('/balance')
  @ApiOkResponse({
    description: `Fetch Wallet Balance`,
    type: FetchWalletBalanceNative,
  })
  getBalance(@Req() request: IRequest) {
    return this.walletService.fetchBalance(request.walletAddress);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
