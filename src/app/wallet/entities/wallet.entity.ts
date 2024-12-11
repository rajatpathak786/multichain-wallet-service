import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Org } from '@org/entities/org.entity';
import { User } from '@user/entities/user.entity';

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
