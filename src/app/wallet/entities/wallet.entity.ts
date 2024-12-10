import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Org } from './org.entity';

@Entity({ name: 'wallet' })
export class Wallet {
  @Column({ type: 'varchar', unique: true })
  walletId: string;

  @Column({ type: 'varchar' })
  chainInfo: string;

  @OneToOne(() => Org)
  @JoinColumn({ name: 'org_id' })
  org: Org;
}
