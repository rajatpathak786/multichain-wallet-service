import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChainName } from '@lib/enum';

export class CreateWalletDto {
  @ApiProperty({
    description: `ChainName name`,
    example: ChainName.SEPOLIA_TESTNET,
    required: true,
  })
  @IsEnum(ChainName)
  @IsNotEmpty()
  chainName: ChainName;
}
