exports.routeConsts = {
  swaggerDocRoute: '/v1/tezDeals-api-doc',
  userRoute: '/v1/users',
};
exports.appErrors = {
  UNAUTHORIZED_ERROR: 'You are not logged in please login to get Access',
  WRONG_CREDENTIAL_ERROR: 'Email or password is incorrect',
  NO_CREDENTIALS: 'Please provide email and password',
  INVALID_FIRSTNAME: 'FirstName must only contain characters between A-Z',
  INVALID_LASTNAME: 'lastName must only contain characters between A-Z',
  FIRSTNAME_REQUIRED: 'FirstName is required',
  LASTNAME_REQUIRED: 'LastName is required',
  PASSWORD_REQUIRED: 'Password is required',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm Password Required',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_LENGTH: 'Enter Password with 8 or more characters',
  INVALID_EMAIL: 'Please Enter Valid Email',
  INVALID_PHONE_NUM: 'Please Enter Valid Phone Number',
  PASSWORD_MISMATCH: 'Password and ConfirmPassword are not equal',
  OPERATION_SUCCESSFULL: 'Operation Successfull',
  NOT_FOUND: 'Not Found',
  SOME_ERROR: 'Something went wrong',
  INVALID_JWT: 'Invalid token! Please Login Again',
  EXPIRED_JWT: 'Your token has expired! please login again',
};

exports.appSuccess = {
  OPERATION_SUCCESSFULL: 'Operation Successfull',
};

exports.resStatus = {
  SUCCESS: 'success',
  FAILURE: 'fail',
  ERROR: 'error',
};
