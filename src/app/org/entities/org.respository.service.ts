import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Org } from './org.entity';

@Injectable()
export class OrgRepositoryService {
  constructor(
    @InjectRepository(Org) private readonly org: Repository<Org>,
  ) {}

  async findAll(): Promise<Org[]> {
    return await this.org.find();
  }

  async create(data: Partial<Org>): Promise<Org> {
    const newOrg = this.org.create(data);
    return this.org.save(newOrg);
  }

  async findById(id: string): Promise<Org> {
    return await this.org.findOneBy({ orgId: id });
  }
}
