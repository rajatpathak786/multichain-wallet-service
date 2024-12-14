import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/db/conn';
import { ConfigModule } from '@nestjs/config';
import { OrgModule } from './org/org.module';
import { ChainInfoModule } from './chain-info/chain-info.module';
import { TokenModule } from './token/token.module';

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
    ChainInfoModule,
    TokenModule,
  ],
})
export class AppModule {}
