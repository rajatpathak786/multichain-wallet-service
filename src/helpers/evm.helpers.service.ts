import { fetchBalanceAbi } from '@lib/constants';
import { ICreateWallet } from '@lib/interface';
import { Injectable } from '@nestjs/common';
import { ethers, formatEther, parseEther } from 'ethers';

@Injectable()
export class EVMHelper {
  private provider: ethers.JsonRpcProvider;

  constructor() {}

  async createWallet(): Promise<ICreateWallet> {
    const wallet = ethers.Wallet.createRandom();
    return { address: wallet.address, privateKey: wallet.privateKey };
  }

  async getBalance(address: string, rpcUrl: string): Promise<string> {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    const balance = await this.provider.getBalance(address);
    return formatEther(balance);
  }

  async sendTransaction(
    privateKey: string,
    to: string,
    amount: string,
    rpcUrl: string,
  ): Promise<string> {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const tx = await wallet.sendTransaction({
      to,
      value: parseEther(amount),
    });
    return tx.hash;
  }

  async fetchTokenBalance(
    walletAddress: string,
    tokenAddress: string,
    rpcUrl: string,
  ): Promise<string> {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    const tokenContract = new ethers.Contract(
      tokenAddress,
      fetchBalanceAbi,
      this.provider,
    );
    const balance = await tokenContract.balanceOf(walletAddress);
    const decimals = 18; // Update as per the token
    const formattedBalance = ethers.formatUnits(balance, decimals);
    return formattedBalance;
  }
}
