import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wallet } from './wallet.entity';
import { User } from 'src/app/user/entities/user.entity';

@Entity({ name: 'org' })
export class Org {
  @PrimaryGeneratedColumn('uuid')
  orgId: string;

  @Column({ type: 'varchar' })
  orgName: string;

  @OneToMany(() => Wallet, (wallet) => wallet.walletId)
  wallets: Wallet[];

  @OneToMany(() => User, (user) => user.userId)
  users: User[];
}
