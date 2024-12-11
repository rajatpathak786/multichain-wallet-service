import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { JwtAuthService } from 'src/helpers/jwt.helpers.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepositoryService } from '../user/entities/user.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [WalletController],
  providers: [WalletService, UserRepositoryService, JwtAuthService],
})
export class WalletModule {}
