import { Module } from '@nestjs/common';
import { ChainInfoService } from './chain-info.service';
import { ChainInfoController } from './chain-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChainInfo } from './entities/chain-info.entity';
import { ChainInfoRepositoryService } from './entities/chain-info.repository.service';
import { JwtAuthService } from '@helpers/jwt.helpers.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepositoryService } from '@user/entities/user.repository.service';
import { User } from '@user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChainInfo, User]), JwtModule],
  controllers: [ChainInfoController],
  providers: [
    ChainInfoService,
    ChainInfoRepositoryService,
    JwtAuthService,
    UserRepositoryService,
  ],
})
export class ChainInfoModule {}
