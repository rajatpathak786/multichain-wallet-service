import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChainInfo } from './chain-info.entity';

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

  async findByName(chainName: string): Promise<ChainInfo> {
    return await this.chainInfo.findOneBy({ chainName });
  }
}
