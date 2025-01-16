import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TokenName } from '@lib/enum/token';
import { ChainName } from '@lib/enum';

export class CreateTokenDto {
  @ApiProperty({
    description: `Token Name`,
    example: TokenName.USDT,
    required: true,
  })
  @IsEnum(TokenName)
  @IsNotEmpty()
  tokenName: TokenName;

  @ApiProperty({
    description: `Chain Name`,
    example: ChainName.SEPOLIA_TESTNET,
    required: true,
  })
  @IsEnum(ChainName)
  @IsNotEmpty()
  chainName: ChainName;

  @ApiProperty({
    description: `Address`,
    example: `0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  tokenAddress: string;
}
