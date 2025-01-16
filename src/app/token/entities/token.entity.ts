import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChainInfo } from '@chain-info/entities/chain-info.entity';
import { TokenName } from '@lib/enum/token';

@Entity({ name: 'token' })
export class Token {
  @PrimaryGeneratedColumn('uuid')
  tokenId: string;

  @Column({ type: 'enum', enum: TokenName })
  tokenName: TokenName;

  @Column({ type: 'varchar' })
  tokenAddress: string;

  @ManyToOne(() => ChainInfo, (chainInfo) => chainInfo.chainId)
  chainInfo: ChainInfo;
}
