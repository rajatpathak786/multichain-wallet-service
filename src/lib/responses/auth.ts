import { ResponseMixin } from '@helpers/api-response.helpers.service';
import { HttpStatus } from '@nestjs/common';

export class InvalidTokenResponse extends ResponseMixin(
  false,
  'Invalid Token',
  'Unauthorized',
) {}
