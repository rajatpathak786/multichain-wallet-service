import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateChainInfoDto } from './dto/create-chain-info.dto';
import { UpdateChainInfoDto } from './dto/update-chain-info.dto';
import { ChainInfoRepositoryService } from './entities/chain-info.repository.service';
import { IApiResponse } from '@lib/interface';
import { ChainInfo } from './entities/chain-info.entity';
import { chainInfoResponseMessages } from '@lib/constants';
import { ChainName } from '@lib/enum';
import { ChainNameParamDto } from './dto/chain-name-param.dto';

@Injectable()
export class ChainInfoService {
  constructor(
    private readonly chainInfoRepositoryService: ChainInfoRepositoryService,
  ) {}
  async create(
    createChainInfoDto: CreateChainInfoDto,
  ): Promise<IApiResponse<ChainInfo>> {
    try {
      const newChainInfo = await this.chainInfoRepositoryService.create(
        createChainInfoDto as any,
      );
      return {
        message: chainInfoResponseMessages.chainInfoAdded,
        data: newChainInfo,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<IApiResponse<ChainInfo[]>> {
    try {
      const chainInfo = await this.chainInfoRepositoryService.findAll();
      return {
        message: chainInfoResponseMessages.fetchAllChainInfoSuccess,
        data: chainInfo,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(
    chainName: ChainNameParamDto,
  ): Promise<IApiResponse<ChainInfo>> {
    try {
      const chainInfo = await this.chainInfoRepositoryService.findByName(
        chainName.name,
      );
      return {
        message: chainInfoResponseMessages.fetchChainInfo,
        data: chainInfo,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: number, updateChainInfoDto: UpdateChainInfoDto) {
    return `This action updates a #${id} chainInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} chainInfo`;
  }
}
