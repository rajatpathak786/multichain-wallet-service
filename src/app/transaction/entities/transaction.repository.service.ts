import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionRepositoryService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transaction: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return await this.transaction.find();
  }

  async create(data: Partial<Transaction>): Promise<Transaction> {
    const newTransaction = this.transaction.create(data);
    return this.transaction.save(newTransaction);
  }

  async findByTxHash(txHash: string): Promise<Transaction> {
    return await this.transaction.findOne({
      where: { txHash },
      relations: ['wallet'],
    });
  }
}
