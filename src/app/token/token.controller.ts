import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { AdminAuthGuard } from '@guards/admin.guards';
import { IRequest } from '@lib/interface';
import { WebAuthGuard } from '@guards/webAuth.guards';
import { TokenParamDto } from './dto/token-param.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  FetchAllTokenResSuccess,
  FetchTokenBalanceSuccess,
  FetchTokenResSuccess,
  InvalidTokenResponse,
  TokenAddedSuccess,
} from '@lib/responses';

@Controller('token')
@ApiBearerAuth()
@ApiTags('Token Apis')
@ApiUnauthorizedResponse({
  description: `Invalid Token`,
  type: InvalidTokenResponse,
})
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({
    description: `Added token successfully`,
    type: TokenAddedSuccess,
  })
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  @ApiOkResponse({
    description: `Fetch all token details`,
    type: FetchAllTokenResSuccess,
  })
  findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: `Fetch token details by id`,
    type: FetchTokenResSuccess,
  })
  @UseGuards(WebAuthGuard)
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(id);
  }

  @Get('/balance/:name')
  @UseGuards(WebAuthGuard)
  @ApiOkResponse({
    description: `Fetch token balance by name`,
    type: FetchTokenBalanceSuccess,
  })
  getTokenBalance(
    @Param('name') name: TokenParamDto,
    @Req() request: IRequest,
  ) {
    return this.tokenService.getTokenBalance(name, request.walletAddress);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
    return this.tokenService.update(+id, updateTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenService.remove(+id);
  }
}
