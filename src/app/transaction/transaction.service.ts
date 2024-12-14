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
import { checkKeyMatch, decrypt } from '@helpers/encryption.helpers.service';
import {
  transactionResponseMessages,
  walletResponseMessages,
} from '@lib/constants';
import { TransactionRepositoryService } from './entities/transaction.repository.service';
import { handleSuccess } from '@helpers/api-response.helpers.service';
import { Transaction } from './entities/transaction.entity';
import { IApiResponse } from '@lib/interface';

@Injectable()
export class TransactionService {
  constructor(
    private readonly evmHelper: EVMHelper,
    private readonly walletRepositoryService: WalletRepositoryService,
    private readonly transactionRepositoryService: TransactionRepositoryService,
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
      const tx = await this.evmHelper.sendTransaction(
        await decrypt(createTransactionDto.keyHash),
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
}
