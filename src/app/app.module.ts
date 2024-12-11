import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/db/conn';

@Module({
  imports: [
    WalletModule,
    TransactionModule,
    UserModule,
    DatabaseModule.forRoot(),
  ],
})
export class AppModule {}
