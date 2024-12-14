export const addUserBadReq = {
  message: [
    'userName must be a string',
    'role must be one of the following values: 0, 1',
    'firstName must be a string',
    'lastName must be a string',
  ],
  error: 'Bad Request',
  statusCode: 400,
};

export const addUserSuccess = {
  message: 'User successfully created',
  data: {
    userName: 'newUser12qw@123',
    role: 1,
    userId: 'b78467ca-e8d9-4cdf-9f1b-5233f5e65b02',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3ODQ2N2NhLWU4ZDktNGNkZi05ZjFiLTUyMzNmNWU2NWIwMiIsInVzZXJSb2xlIjoxLCJpYXQiOjE3MzQxODk1MjIsImV4cCI6MS4yZSsxMDl9.2P1gdRNW-m4WLqocMr2IXTSTXh_9kx6-dTAPxiQY_ms',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI3ODQ2N2NhLWU4ZDktNGNkZi05ZjFiLTUyMzNmNWU2NWIwMiIsInVzZXJSb2xlIjoxLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNkltSTNPRFEyTjJOaExXVTRaRGt0TkdOa1ppMDVaakZpTFRVeU16Tm1OV1UyTldJd01pSXNJblZ6WlhKU2IyeGxJam94TENKcFlYUWlPakUzTXpReE9EazFNaklzSW1WNGNDSTZNUzR5WlNzeE1EbDkuMlAxZ2RSTlctbTRXTHFvY01yMklYVFNUWGhfOWt4Ni1kVEFQeGlRWV9tcyIsImlhdCI6MTczNDE4OTUyMiwiZXhwIjoxNzM0MTkwOTYyfQ.Ccb8xaamx4PPUbvivMBOphgDo6gd7bJn19nezug7a94',
  },
};
