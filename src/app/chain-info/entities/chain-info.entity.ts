import { ChainName } from '@lib/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chain-info' })
export class ChainInfo {
  @PrimaryGeneratedColumn('uuid')
  chainId: string;

  @Column({ type: 'enum', enum: ChainName })
  chainName: ChainName;

  @Column({ type: 'varchar' })
  rpcUrl: string;

  //TODO: Need to check if we'll need to map chain with the associated wallets
  //   @OneToMany(() => Wallet, (wallet) => wallet.walletAddress)
  //   wallets: Wallet[];
}
