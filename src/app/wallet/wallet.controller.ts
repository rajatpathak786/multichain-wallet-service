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

@Controller('wallet')
@UseGuards(WebAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto, @Req() request: IRequest) {
    return this.walletService.create(createWalletDto, request.userId);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':walletAddress')
  findOne(@Param('walletAddress') walletAddress: string) {
    return this.walletService.findOne(walletAddress);
  }

  @Get('/balance/:walletAddress')
  getBalance(@Param('walletAddress') walletAddress: string) {
    return this.walletService.fetchBalance(walletAddress);
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
