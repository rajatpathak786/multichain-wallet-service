import { ResponseMixin } from '@helpers/api-response.helpers.service';
import { chainInfoResponseMessages } from '@lib/constants';
import {
  chainInfoAddedFailure,
  chainInfoAddedSuccess,
  getAllChainInfosSuccess,
  getChainDetailsByName,
  getChainDetailsError,
} from '@lib/swagger-examples';

export class ChainDetailsAdded extends ResponseMixin(
  true,
  chainInfoResponseMessages.chainInfoAdded,
  chainInfoAddedSuccess.data,
) {}

export class ChainAddedError extends ResponseMixin(
  false,
  chainInfoAddedFailure.message,
  chainInfoAddedFailure.error,
) {}

export class GetAllChainInfosSuccess extends ResponseMixin(
  true,
  getAllChainInfosSuccess.message,
  getAllChainInfosSuccess.data,
) {}

export class GetChainDetailsByNameSuccess extends ResponseMixin(
  true,
  getChainDetailsByName.message,
  getChainDetailsByName.data,
) {}

export class GetChainDetailsByNameError extends ResponseMixin(
  false,
  getChainDetailsError.message,
  getChainDetailsError.error,
) {}
