import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepositoryService } from './entities/wallet.repository.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepositoryService: WalletRepositoryService
  ){}
  async create(createWalletDto: CreateWalletDto) {
    try {
      //TODO: Create wallet via rpc

      const createWallet = await this.walletRepositoryService.create(createWalletDto);      
      return {
        message: `Wallet successfully created`,
        data: { ...createWallet },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
