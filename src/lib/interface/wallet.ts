import { Wallet } from '@wallet/entities/wallet.entity';

export interface ICreateWallet {
  address: string;
  privateKey: string;
}

export interface IWallet extends Wallet {
  accessToken: string;
  refreshToken: string;
}

export interface ICreateWalletSolana {
  address: string;
  privateKey: Uint8Array;
}
