import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ChainInfoService } from './chain-info.service';
import { CreateChainInfoDto } from './dto/create-chain-info.dto';
import { UpdateChainInfoDto } from './dto/update-chain-info.dto';
import { IApiResponse } from '@lib/interface';
import { ChainInfo } from './entities/chain-info.entity';
import { AdminAuthGuard } from '@guards/admin.guards';
import { ChainNameParamDto } from './dto/chain-name-param.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  InvalidTokenResponse,
  ChainAddedError,
  ChainDetailsAdded,
  GetAllChainInfosSuccess,
  GetChainDetailsByNameError,
  GetChainDetailsByNameSuccess,
} from '@lib/responses';

@Controller('chain-info')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Chain-Info Apis')
@ApiUnauthorizedResponse({
  description: `Invalid Token`,
  type: InvalidTokenResponse,
})
export class ChainInfoController {
  constructor(private readonly chainInfoService: ChainInfoService) {}

  @Post()
  @ApiOkResponse({
    description: `Chain Info Added Successfully`,
    type: ChainDetailsAdded,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ChainAddedError,
  })
  create(
    @Body() createChainInfoDto: CreateChainInfoDto,
  ): Promise<IApiResponse<ChainInfo>> {
    return this.chainInfoService.create(createChainInfoDto);
  }

  @Get()
  @ApiOkResponse({
    description: `Get All Chain Infos`,
    type: GetAllChainInfosSuccess,
  })
  findAll() {
    return this.chainInfoService.findAll();
  }

  @Get(':name')
  @ApiOkResponse({
    description: `Get Chain Details By Name`,
    type: GetChainDetailsByNameSuccess,
  })
  @ApiBadRequestResponse({
    description: 'Get Chain details by name error',
    type: GetChainDetailsByNameError,
  })
  findOne(
    @Param('name') name: ChainNameParamDto,
  ): Promise<IApiResponse<ChainInfo>> {
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
