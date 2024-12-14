import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepositoryService } from './entities/wallet.repository.service';
import { EVMHelper } from '@helpers/evm.helpers.service';
import {
  encrypt,
  generateHash,
  uint8ArrayToBase64,
} from '@helpers/encryption.helpers.service';
import { ChainInfoRepositoryService } from '@chain-info/entities/chain-info.repository.service';
import { UserRepositoryService } from '@user/entities/user.repository.service';
import { Wallet } from './entities/wallet.entity';
import { IApiResponse, ICreateWallet, IWallet } from '@lib/interface';
import { walletResponseMessages } from '@lib/constants';
import { handleSuccess } from '@helpers/api-response.helpers.service';
import { JwtAuthService } from '@helpers/jwt.helpers.service';
import { ChainName } from '@lib/enum';
import { SolanaHelper } from '@helpers/solana.helpers.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepositoryService: WalletRepositoryService,
    private readonly chainInfoRepositoryService: ChainInfoRepositoryService,
    private readonly userRepositoryService: UserRepositoryService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly evmHelper: EVMHelper,
    private readonly solanaHelper: SolanaHelper,
  ) {}
  async create(
    createWalletDto: CreateWalletDto,
    userId: string,
  ): Promise<IApiResponse<IWallet>> {
    try {
      const newWallet = await this.createWallet(createWalletDto.chainName);
      const hash = await encrypt(newWallet.privateKey);
      const keyHash = await generateHash(newWallet.privateKey);
      const chainInfo = await this.chainInfoRepositoryService.findByName(
        createWalletDto.chainName,
      );
      const user = await this.userRepositoryService.findById(userId);
      const addWalletDetails = await this.walletRepositoryService.create({
        walletAddress: newWallet.address,
        keyHash,
        chainInfo,
        user,
      });
      const { accessToken, refreshToken } =
        await this.jwtAuthService.generateToken(
          userId,
          user.role,
          newWallet.address,
        );
      return handleSuccess<IWallet>(
        walletResponseMessages.walletSuccessfullyCreated,
        { ...addWalletDetails, accessToken, refreshToken, keyHash: hash },
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<IApiResponse<Wallet[]>> {
    try {
      return handleSuccess<Wallet[]>(
        walletResponseMessages.allWalletsFetched,
        await this.walletRepositoryService.findAll(),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(walletAddress: string): Promise<IApiResponse<Wallet>> {
    try {
      return handleSuccess<Wallet>(
        walletResponseMessages.walletDetailsFetched,
        await this.walletRepositoryService.findByAddress(walletAddress),
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchBalance(walletAddress: string): Promise<IApiResponse<string>> {
    try {
      const walletDetails =
        await this.walletRepositoryService.findByAddress(walletAddress);
      const rpcUrl = (
        await this.chainInfoRepositoryService.findByName(
          walletDetails.chainInfo.chainName,
        )
      ).rpcUrl;
      const balance = await this.fetchBalanceChain(
        walletDetails.chainInfo.chainName,
        walletAddress,
        rpcUrl,
      );
      return handleSuccess<string>(
        walletResponseMessages.walletBalance,
        balance,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async createWallet(chainName: ChainName): Promise<ICreateWallet> {
    let newWallet;
    switch (chainName) {
      case ChainName.SEPOLIA_TESTNET:
        newWallet = await this.evmHelper.createWallet();
        break;
      case ChainName.SOLANA_TESTNET:
        newWallet = this.solanaHelper.createWallet();
        newWallet.privateKey = uint8ArrayToBase64(newWallet.privateKey);
        break;
    }
    return newWallet;
  }

  async fetchBalanceChain(
    chainName: ChainName,
    walletAddress: string,
    rpcUrl: string,
  ): Promise<string> {
    let balance: string;
    switch (chainName) {
      case ChainName.SEPOLIA_TESTNET:
        balance = await this.evmHelper.getBalance(walletAddress, rpcUrl);
        break;
      case ChainName.SOLANA_TESTNET:
        balance = await this.solanaHelper.getBalance(walletAddress, rpcUrl);
        break;
    }
    return balance;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
