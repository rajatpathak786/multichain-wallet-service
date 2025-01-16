import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChainName } from '@lib/enum';

export class CreateChainInfoDto {
  @ApiProperty({
    description: `Chain name`,
    example: ChainName.SEPOLIA_TESTNET,
    required: true,
  })
  @IsEnum(ChainName)
  @IsNotEmpty()
  chainName: ChainName;

  @ApiProperty({
    description: `Chain rpc Url`,
    example: `First Name`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  rpcUrl: string;
}
