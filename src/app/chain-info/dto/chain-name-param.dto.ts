import { ChainName, TokenName } from '@lib/enum';
import { IsEnum } from 'class-validator';

export class ChainNameParamDto {
  @IsEnum(ChainName, {
    message:
      'Invalid chain name. Allowed values are SepoliaTestnet, SolanaTestnet.',
  })
  name: ChainName;
}
