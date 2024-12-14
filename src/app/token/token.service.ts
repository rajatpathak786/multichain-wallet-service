import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenRepositoryService } from './entities/token.repository.service';
import { ChainInfoRepositoryService } from '@chain-info/entities/chain-info.repository.service';
import { handleSuccess } from '@helpers/api-response.helpers.service';
import { Token } from './entities/token.entity';
import { tokenResponseMessages } from '@lib/constants';
import { IApiResponse } from '@lib/interface';
import { ChainName, TokenName } from '@lib/enum';
import { WalletRepositoryService } from '@wallet/entities/wallet.repository.service';
import { EVMHelper } from '@helpers/evm.helpers.service';
import { SolanaHelper } from '@helpers/solana.helpers.service';
import { TokenParamDto } from './dto/token-param.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepositoryService: TokenRepositoryService,
    private readonly chainInfoRepository: ChainInfoRepositoryService,
    private readonly walletRepository: WalletRepositoryService,
    private readonly evmHelper: EVMHelper,
    private readonly solanaHelper: SolanaHelper,
  ) {}
  async create(createTokenDto: CreateTokenDto): Promise<IApiResponse<Token>> {
    try {
      const chainDetails = await this.chainInfoRepository.findByName(
        createTokenDto.chainName,
      );
      const addNewToken = await this.tokenRepositoryService.create({
        tokenName: createTokenDto.tokenName,
        tokenAddress: createTokenDto.tokenAddress,
        chainInfo: chainDetails,
      });
      return handleSuccess<Token>(
        tokenResponseMessages.tokenAddedSuccess,
        addNewToken,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<IApiResponse<Token[]>> {
    try {
      const tokenDetails = await this.tokenRepositoryService.findAll();
      return handleSuccess<Token[]>(
        tokenResponseMessages.allTokenDetailsFetched,
        tokenDetails,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<IApiResponse<Token>> {
    try {
      const tokenDetails = await this.tokenRepositoryService.findById(id);
      return handleSuccess<Token>(
        tokenResponseMessages.tokenDetailsFetchSuccess,
        tokenDetails,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTokenBalance(
    tokenName: TokenParamDto,
    walletAddress: string,
  ): Promise<IApiResponse<string>> {
    try {
      const walletDetails =
        await this.walletRepository.findByAddress(walletAddress);
      const tokenDetails = await this.tokenRepositoryService.findByName(
        tokenName.name,
        walletDetails.chainInfo,
      );
      const balance = await this.fetchBalanceChain(
        walletDetails.chainInfo.chainName,
        walletAddress,
        tokenDetails.tokenAddress,
        tokenDetails.chainInfo.rpcUrl,
      );
      return handleSuccess<string>(
        tokenResponseMessages.tokenDetailsFetchSuccess,
        balance,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchBalanceChain(
    chainName: ChainName,
    walletAddress: string,
    tokenAddress: string,
    rpc: string,
  ) {
    let balance: string;
    switch (chainName) {
      case ChainName.SEPOLIA_TESTNET:
        balance = await this.evmHelper.fetchTokenBalance(
          walletAddress,
          tokenAddress,
          rpc,
        );
        break;
      case ChainName.SOLANA_TESTNET:
        balance = await this.solanaHelper.fetchTokenBalance(
          walletAddress,
          tokenAddress,
          rpc,
        );
        break;
    }
    return balance;
  }

  update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
