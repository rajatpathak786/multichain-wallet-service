import { Chain } from '@lib/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'chain-info' })
export class ChainInfo {
  @PrimaryGeneratedColumn('uuid')
  chainId: string;

  @Column({ type: 'varchar', unique: true })
  chainName: string;

  @Column({ type: 'varchar' })
  rpcUrl: string;

  //TODO: Need to check if we'll need to map chain with the associated wallets
  //   @OneToMany(() => Wallet, (wallet) => wallet.walletId)
  //   wallets: Wallet[];
}
