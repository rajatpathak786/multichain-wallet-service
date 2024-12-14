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
import { TokenName } from '@lib/enum';
import { IRequest } from '@lib/interface';
import { WebAuthGuard } from '@guards/webAuth.guards';
import { TokenParamDto } from './dto/token-param.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.create(createTokenDto);
  }

  @Get()
  findAll() {
    return this.tokenService.findAll();
  }

  @Get(':id')
  @UseGuards(WebAuthGuard)
  findOne(@Param('id') id: string) {
    return this.tokenService.findOne(id);
  }

  @Get('/balance/:name')
  @UseGuards(WebAuthGuard)
  getTokenBalance(@Param('name') name: TokenParamDto, @Req() request: IRequest) {
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
