import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.user.find();
  }

  async create(data: any): Promise<User> {
    return this.user.save(data);
  }

  async findById(id: string): Promise<User> {
    return await this.user.findOneBy({ userId: id });
  }
}
