import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Org } from '@org/entities/org.entity';
import { User } from '@user/entities/user.entity';
import { ChainInfo } from '@chain-info/entities/chain-info.entity';

@Entity({ name: 'wallet' })
export class Wallet {
  @PrimaryColumn({ type: 'varchar', unique: true })
  walletAddress: string;

  @Column({ type: 'varchar' })
  keyHash: string;

  @ManyToOne(() => ChainInfo, (chainInfo) => chainInfo.chainId)
  chainInfo: ChainInfo;

  @ManyToOne(() => Org, (org) => org.orgId)
  org: Org;

  @ManyToOne(() => User, (user) => user.userId)
  user: User;
}
