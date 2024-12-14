import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { EVMHelper } from '@helpers/evm.helpers.service';
import { WalletRepositoryService } from '@wallet/entities/wallet.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '@wallet/entities/wallet.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from '@helpers/jwt.helpers.service';
import { UserRepositoryService } from '@user/entities/user.repository.service';
import { User } from '@user/entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepositoryService } from './entities/transaction.repository.service';
import { SolanaHelper } from '@helpers/solana.helpers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, User, Transaction]), JwtModule],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    EVMHelper,
    SolanaHelper,
    WalletRepositoryService,
    UserRepositoryService,
    TransactionRepositoryService,
    JwtAuthService,
  ],
})
export class TransactionModule {}
