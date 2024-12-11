import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Org } from './org.entity';
import { User } from 'src/app/user/entities/user.entity';

@Entity({ name: 'wallet' })
export class Wallet {
  @PrimaryColumn({ type: 'varchar', unique: true })
  walletId: string;

  @Column({ type: 'varchar' })
  chainInfo: string;

  @ManyToOne(() => Org, (org) => org.orgId)
  org: Org;

  @ManyToOne(() => User, (user) => user.userId)
  user: User;
}
