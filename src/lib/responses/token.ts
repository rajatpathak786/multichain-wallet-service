import { ResponseMixin } from '@helpers/api-response.helpers.service';
import {
  addAllTokens,
  addTokenResponseSuccess,
  fetchBalanceByTokenSuccess,
  getTokenDetailsById,
} from '@lib/swagger-examples';

export class TokenAddedSuccess extends ResponseMixin(
  true,
  addTokenResponseSuccess.message,
  addTokenResponseSuccess.data,
) {}

export class FetchAllTokenResSuccess extends ResponseMixin(
  true,
  addAllTokens.message,
  addAllTokens.data,
) {}

export class FetchTokenResSuccess extends ResponseMixin(
  true,
  getTokenDetailsById.message,
  getTokenDetailsById.data,
) {}

export class FetchTokenBalanceSuccess extends ResponseMixin(
  true,
  fetchBalanceByTokenSuccess.message,
  fetchBalanceByTokenSuccess.data,
) {}
