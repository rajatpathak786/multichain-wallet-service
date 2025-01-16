import { ResponseMixin } from '@helpers/api-response.helpers.service';
import { addUserBadReq, addUserSuccess } from '@lib/swagger-examples';

export class AddUser extends ResponseMixin(
  true,
  addUserSuccess.message,
  addUserSuccess.data,
) {}

export class AddUserBadReq extends ResponseMixin(
  false,
  addUserBadReq.message,
  addUserBadReq.error,
) {}
