import { UserRole } from '@lib/enum';
import { Org } from '@org/entities/org.entity';
import { Wallet } from '@wallet/entities/wallet.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', unique: true })
  userName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @ManyToOne(() => Org, (org) => org.orgId)
  org: Org;

  @OneToMany(() => Wallet, (wallet) => wallet.walletAddress)
  wallets: Wallet[];
}
