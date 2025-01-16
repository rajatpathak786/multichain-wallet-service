import { ResponseMixin } from '@helpers/api-response.helpers.service';
import { insufficientFunds, transactionSuccess } from '@lib/swagger-examples';

export class TransferSuccess extends ResponseMixin(
  true,
  transactionSuccess.message,
  transactionSuccess.data,
) {}

export class TransactionFailedInsufficientFunds extends ResponseMixin(
  false,
  insufficientFunds.shortMessage,
  insufficientFunds,
) {}
