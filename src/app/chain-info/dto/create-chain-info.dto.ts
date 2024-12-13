import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Chain } from '@lib/enum';

export class CreateChainInfoDto {
  @ApiProperty({
    description: `Chain name`,
    example: Chain.SepoliaTestnet,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  chainName: string;

  @ApiProperty({
    description: `Chain rpc Url`,
    example: `First Name`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  rpcUrl: string;
}
