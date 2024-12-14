import { ResponseMixin } from '@helpers/api-response.helpers.service';
import {
  createWalletBadReq,
  createWalletSuccess,
  fetchWalletBalance,
  getWalletDetails,
} from '@lib/swagger-examples';

export class CreateWalletBadReq extends ResponseMixin(
  false,
  createWalletBadReq.message,
  createWalletBadReq.error,
) {}

export class CreateWalletSuccess extends ResponseMixin(
  true,
  createWalletSuccess.message,
  createWalletSuccess.data,
) {}

export class FetchWalletBalanceNative extends ResponseMixin(
  true,
  fetchWalletBalance.message,
  fetchWalletBalance.data,
) {}

export class FetchWalletDetails extends ResponseMixin(
  true,
  getWalletDetails.message,
  getWalletDetails.data,
) {}
