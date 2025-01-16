import { TokenName } from '@lib/enum';
import { IsEnum } from 'class-validator';

export class TokenParamDto {
  @IsEnum(TokenName, {
    message: 'Invalid token name. Allowed values are USDT, USDC.',
  })
  name: TokenName;
}
