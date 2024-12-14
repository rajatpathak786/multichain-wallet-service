import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenRepositoryService } from './entities/token.repository.service';
import { ChainInfo } from '@chain-info/entities/chain-info.entity';
import { ChainInfoRepositoryService } from '@chain-info/entities/chain-info.repository.service';
import { JwtAuthService } from '@helpers/jwt.helpers.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from '@user/entities/user.entity';
import { UserRepositoryService } from '@user/entities/user.repository.service';
import { WalletRepositoryService } from '@wallet/entities/wallet.repository.service';
import { Wallet } from '@wallet/entities/wallet.entity';
import { EVMHelper } from '@helpers/evm.helpers.service';
import { SolanaHelper } from '@helpers/solana.helpers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, ChainInfo, User, Wallet]),
    JwtModule,
  ],
  controllers: [TokenController],
  providers: [
    TokenService,
    TokenRepositoryService,
    ChainInfoRepositoryService,
    WalletRepositoryService,
    UserRepositoryService,
    JwtAuthService,
    EVMHelper,
    SolanaHelper,
  ],
})
export class TokenModule {}
