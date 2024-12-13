import { Module } from '@nestjs/common';
import { ChainInfoService } from './chain-info.service';
import { ChainInfoController } from './chain-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChainInfo } from './entities/chain-info.entity';
import { ChainInfoRepositoryService } from './entities/chain-info.repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChainInfo])],
  controllers: [ChainInfoController],
  providers: [ChainInfoService, ChainInfoRepositoryService],
})
export class ChainInfoModule {}
