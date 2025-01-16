import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { JwtAuthService } from '@helpers/jwt.helpers.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepositoryService } from '../user/entities/user.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Wallet } from './entities/wallet.entity';
import { WalletRepositoryService } from './entities/wallet.repository.service';
import { EVMHelper } from '@helpers/evm.helpers.service';
import { ChainInfoRepositoryService } from '@chain-info/entities/chain-info.repository.service';
import { ChainInfo } from '@chain-info/entities/chain-info.entity';
import { SolanaHelper } from '@helpers/solana.helpers.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet, ChainInfo]), JwtModule],
  controllers: [WalletController],
  providers: [
    WalletService,
    UserRepositoryService,
    WalletRepositoryService,
    ChainInfoRepositoryService,
    JwtAuthService,
    EVMHelper,
    SolanaHelper
  ],
})
export class WalletModule {}
