import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChainInfoService } from './chain-info.service';
import { CreateChainInfoDto } from './dto/create-chain-info.dto';
import { UpdateChainInfoDto } from './dto/update-chain-info.dto';
import { IApiResponse } from '@lib/interface';
import { ChainInfo } from './entities/chain-info.entity';

@Controller('chain-info')
export class ChainInfoController {
  constructor(private readonly chainInfoService: ChainInfoService) {}

  @Post()
  create(
    @Body() createChainInfoDto: CreateChainInfoDto,
  ): Promise<IApiResponse<ChainInfo>> {
    return this.chainInfoService.create(createChainInfoDto);
  }

  @Get()
  findAll() {
    return this.chainInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('name') name: string): Promise<IApiResponse<ChainInfo>> {
    return this.chainInfoService.findOne(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChainInfoDto: UpdateChainInfoDto,
  ) {
    return this.chainInfoService.update(+id, updateChainInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chainInfoService.remove(+id);
  }
}
