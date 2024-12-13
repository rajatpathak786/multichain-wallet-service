import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChainInfo } from './chain-info.entity';
import { ChainName } from '@lib/enum';

@Injectable()
export class ChainInfoRepositoryService {
  constructor(
    @InjectRepository(ChainInfo) private readonly chainInfo: Repository<ChainInfo>,
  ) {}

  async findAll(): Promise<ChainInfo[]> {
    return await this.chainInfo.find();
  }

  async create(data: Partial<ChainInfo>): Promise<ChainInfo> {
    const newChain = this.chainInfo.create(data);
    return this.chainInfo.save(newChain);
  }

  async findByName(chainName: ChainName): Promise<ChainInfo> {
    return await this.chainInfo.findOneBy({ chainName });
  }
}
