import { ICreateWalletSolana } from '@lib/interface';
import { Injectable } from '@nestjs/common';
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';

@Injectable()
export class SolanaHelper {
  private connection: Connection;

  constructor() {}

  createWallet(): ICreateWalletSolana {
    const keypair = Keypair.generate();
    return {
      address: keypair.publicKey.toString(),
      privateKey: keypair.secretKey,
    };
  }

  async getBalance(address: string, rpcUrl: string): Promise<string> {
    this.connection = new Connection(rpcUrl, 'confirmed');
    const balance = await this.connection.getBalance(new PublicKey(address));
    return (balance / 1e9).toString();
  }

  async sendTransaction(
    privateKey: Uint8Array,
    to: string,
    amount: number,
    rpcUrl: string,
  ): Promise<string> {
    this.connection = new Connection(rpcUrl, 'confirmed');
    const fromKeyPair = Keypair.fromSecretKey(privateKey);
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeyPair.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * 1e9,
      }),
    );
    const signature = await this.connection.sendTransaction(tx, [fromKeyPair]);
    return signature;
  }
}
