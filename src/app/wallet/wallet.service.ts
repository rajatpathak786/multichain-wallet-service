import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepositoryService } from './entities/wallet.repository.service';
import { EVMHelper } from '@helpers/evm.helpers.service';
import {
  decrypt,
  encrypt,
  generateHash,
} from '@helpers/encryption.helpers.service';
import { ChainInfoRepositoryService } from '@chain-info/entities/chain-info.repository.service';
import { UserRepositoryService } from '@user/entities/user.repository.service';
import { Wallet } from './entities/wallet.entity';
import { IApiResponse, IWallet } from '@lib/interface';
import { walletResponseMessages } from '@lib/constants';
import { handleSuccess } from '@helpers/api-response.helpers.service';
import { JwtAuthService } from '@helpers/jwt.helpers.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepositoryService: WalletRepositoryService,
    private readonly chainInfoRepositoryService: ChainInfoRepositoryService,
    private readonly userRepositoryService: UserRepositoryService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly evmHelper: EVMHelper,
  ) {}
  async create(
    createWalletDto: CreateWalletDto,
    userId: string,
  ): Promise<IApiResponse<IWallet>> {
    try {
      const newWallet = await this.evmHelper.createWallet();
      const hash = await encrypt(newWallet.privateKey);
      const decrypti = await decrypt(hash);
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
        await this.jwtAuthService.generateToken(userId, newWallet.address);
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
      const balance = await this.evmHelper.getBalance(walletAddress, rpcUrl);
      return handleSuccess<string>(
        walletResponseMessages.walletBalance,
        balance,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
