import { ICreateWalletSolana } from '@lib/interface';
import { Injectable } from '@nestjs/common';
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import {
  getAccount,
  getAssociatedTokenAddress,
  TokenAccountNotFoundError,
} from '@solana/spl-token';

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

  async fetchTokenBalance(
    walletAddress: string,
    tokenAddress: string,
    rpcUrl: string,
  ): Promise<string> {
    this.connection = new Connection(rpcUrl, 'confirmed');
    const walletPublicKey = new PublicKey(walletAddress);
    const tokenMintPublicKey = new PublicKey(tokenAddress);

    try {
      const tokenAccountAddress = await getAssociatedTokenAddress(
        tokenMintPublicKey,
        walletPublicKey,
      );
      const tokenAccount = await getAccount(
        this.connection,
        tokenAccountAddress,
      );

      const balance = tokenAccount.amount;

      return balance.toString();
    } catch (error) {
      if (error instanceof TokenAccountNotFoundError) {
        return '0';
      }
      throw error;
    }
  }
}
