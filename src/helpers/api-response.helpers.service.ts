export const handleSuccess = <T>(
  message: string,
  data: T,
): { message: string; data: T } => {
  return { message, data };
};

import { ApiProperty } from '@nestjs/swagger';

export const ResponseMixin = <T>(
  success: boolean,
  exampleMessage: string | string[],
  exampleData: T,
) => {
  class Response {
    @ApiProperty({
      example: exampleMessage,
    })
    message: string | string[];
  }
  class SuccessResponse extends Response {
    @ApiProperty({
      example: exampleData,
    })
    data: T;
  }
  class ErrorResponse extends Response {
    @ApiProperty({
      example: exampleData,
    })
    error: T;
  }
  return success ? SuccessResponse : ErrorResponse;
};
