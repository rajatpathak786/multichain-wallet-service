import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletRepositoryService {
  constructor(
    @InjectRepository(Wallet) private readonly wallet: Repository<Wallet>,
  ) {}

  async findAll(): Promise<Wallet[]> {
    return await this.wallet.find();
  }

  async create(data: Partial<Wallet>): Promise<Wallet> {
    const newWallet = this.wallet.create(data);
    return this.wallet.save(newWallet);
  }

  async findByAddress(walletAddress: string): Promise<Wallet> {
    return await this.wallet.findOne({
      where: { walletAddress },
      relations: ['user', 'chainInfo', 'org'],
    });
  }
}
