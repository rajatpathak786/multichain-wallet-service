import { Org } from 'src/app/wallet/entities/org.entity';
import { Wallet } from 'src/app/wallet/entities/wallet.entity';
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

  @Column({ type: 'varchar' })
  userName: string;

  @ManyToOne(() => Org, (org) => org.orgId)
  org: Org;

  @OneToMany(() => Wallet, (wallet) => wallet.walletId)
  wallets: Wallet[];
}
