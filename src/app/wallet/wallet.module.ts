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

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet]), JwtModule],
  controllers: [WalletController],
  providers: [
    WalletService,
    UserRepositoryService,
    WalletRepositoryService,
    JwtAuthService,
  ],
})
export class WalletModule {}
