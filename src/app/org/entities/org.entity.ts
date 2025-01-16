import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from '@wallet/entities/wallet.entity';
import { User } from '@user/entities/user.entity';

@Entity({ name: 'org' })
export class Org {
  @PrimaryGeneratedColumn('uuid')
  orgId: string;

  @Column({ type: 'varchar' })
  orgName: string;

  @OneToMany(() => Wallet, (wallet) => wallet.walletAddress)
  wallets: Wallet[];

  @OneToMany(() => User, (user) => user.userId)
  users: User[];
}
