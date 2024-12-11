import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/db/conn';
import { ConfigModule } from '@nestjs/config';
import { OrgModule } from './org/org.module';

@Module({
  imports: [
    WalletModule,
    TransactionModule,
    UserModule,
    DatabaseModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
    }),
    OrgModule,
  ],
})
export class AppModule {}
