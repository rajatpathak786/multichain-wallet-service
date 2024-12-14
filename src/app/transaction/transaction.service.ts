import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { EVMHelper } from '@helpers/evm.helpers.service';
import { WalletRepositoryService } from '@wallet/entities/wallet.repository.service';
import {
  base64ToUint8Array,
  checkKeyMatch,
  decrypt,
} from '@helpers/encryption.helpers.service';
import {
  transactionResponseMessages,
  walletResponseMessages,
} from '@lib/constants';
import { TransactionRepositoryService } from './entities/transaction.repository.service';
import { handleSuccess } from '@helpers/api-response.helpers.service';
import { Transaction } from './entities/transaction.entity';
import { IApiResponse } from '@lib/interface';
import { ChainName } from '@lib/enum';
import { SolanaHelper } from '@helpers/solana.helpers.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly evmHelper: EVMHelper,
    private readonly walletRepositoryService: WalletRepositoryService,
    private readonly transactionRepositoryService: TransactionRepositoryService,
    private readonly solanaHelper: SolanaHelper,
  ) {}
  async create(
    createTransactionDto: CreateTransactionDto,
    walletAddress: string,
  ): Promise<IApiResponse<Transaction>> {
    try {
      const walletDetails =
        await this.walletRepositoryService.findByAddress(walletAddress);
      const isKeyMatch = await checkKeyMatch(
        createTransactionDto.keyHash,
        walletDetails.keyHash,
      );
      if (!isKeyMatch) {
        throw new ForbiddenException(walletResponseMessages.walletKeyMismatch);
      }
      const tx = await this.sendTransactionChain(
        walletDetails.chainInfo.chainName,
        createTransactionDto.keyHash,
        createTransactionDto.recieverAddress,
        createTransactionDto.amount,
        walletDetails.chainInfo.rpcUrl,
      );
      const createTx = await this.transactionRepositoryService.create({
        txHash: tx,
        wallet: walletDetails,
      });
      return handleSuccess<Transaction>(
        transactionResponseMessages.transactionResponseSuccess,
        createTx,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  async sendTransactionChain(
    chainName: ChainName,
    keyHash: string,
    recieverAddress: string,
    amount: string,
    rpcUrl: string,
  ): Promise<string> {
    let tx;    
    switch (chainName) {
      case ChainName.SEPOLIA_TESTNET:
        tx = await this.evmHelper.sendTransaction(
          await decrypt(keyHash),
          recieverAddress,
          amount,
          rpcUrl,
        );
        break;
      case ChainName.SOLANA_TESTNET:
        tx = await this.solanaHelper.sendTransaction(
          base64ToUint8Array(await decrypt(keyHash)),
          recieverAddress,
          Number(amount),
          rpcUrl,
        );
        break;
    }
    return tx;
  }
}
