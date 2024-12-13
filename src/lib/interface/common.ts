import { Request } from "express";

export interface IApiResponse<T> {
  message: string;
  data: T;
}

export interface IJwtTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRequest extends Request {
    userId: string
}