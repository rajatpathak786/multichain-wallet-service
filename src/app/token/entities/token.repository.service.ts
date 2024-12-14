import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { TokenName } from '@lib/enum';
import { ChainInfo } from '@chain-info/entities/chain-info.entity';

@Injectable()
export class TokenRepositoryService {
  constructor(
    @InjectRepository(Token)
    private readonly token: Repository<Token>,
  ) {}

  async findAll(): Promise<Token[]> {
    return await this.token.find({ relations: ['chainInfo'] });
  }

  async create(data: Partial<Token>): Promise<Token> {
    const newToken = this.token.create(data);
    return this.token.save(newToken);
  }

  async findById(tokenId: string): Promise<Token> {
    return await this.token.findOne({
      where: { tokenId },
      relations: ['chainInfo'],
    });
  }

  async findByName(tokenName: TokenName, chainInfo: ChainInfo): Promise<Token> {
    return await this.token.findOne({
      where: { tokenName, chainInfo },
      relations: ['chainInfo'],
    });
  }
}
