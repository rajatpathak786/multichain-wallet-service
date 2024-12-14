import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Wallet } from '@wallet/entities/wallet.entity';

@Entity({ name: 'transaction' })
export class Transaction {
  @PrimaryColumn({ type: 'varchar', unique: true })
  txHash: string;

  @ManyToOne(() => Wallet, (wallet) => wallet.walletAddress)
  wallet: Wallet;
}
