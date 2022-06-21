export enum ErrorCode {
  OK = 'OK',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  OTP_EXPIRED = 'OTP_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  RATE_LIMIT_REACHED = 'RATE_LIMIT_REACHED',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  FORBIDDEN = 'FORBIDDEN',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  EMAIL_ALREADY_REGISTERED = 'EMAIL_ALREADY_REGISTERED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  TOKEN_VERIFY_ERROR = 'TOKEN_VERIFY_ERROR',
  EMAIL_NOT_EXIST = 'EMAIL_NOT_EXIST',
  PADDLE_NUMBER_EXISTS_ON_ANOTHER_USER = 'PADDLE_NUMBER_EXISTS_ON_ANOTHER_USER',
  PADDLE_NUMBER_EXISTS_ON_ANOTHER_CLIENT = 'PADDLE_NUMBER_EXISTS_ON_ANOTHER_CLIENT',
  NOT_PROVIDED_FILE_NAME = 'NOT_PROVIDED_FILE_NAME',
  NO_VALID_FILE_EXTENSION = 'NO_VALID_FILE_EXTENSION',
  ERROR_OBTAINING_PRE_SIGNED_AWS_URL = 'ERROR_OBTAINING_PRE_SIGNED_AWS_URL',
  DUPLICATE_KEY_VALUE_VIOLATES_UNIQUE_CONSTRAINT = 'DUPLICATE_KEY_VALUE_VIOLATES_UNIQUE_CONSTRAINT',
  REMOVING_FILE_ERROR = 'REMOVING_FILE_ERROR',
  UNIQUE_ORDER_AUCTION_NUMBER_ERROR = 'duplicate key value violates unique constraint "unique_order_auction_numbers"',
  UNIQUE_AUCTION_NUMBER_ERROR = 'UNIQUE_AUCTION_NUMBER_ERROR',
  ERROR_ADDING_POLICY_TO_S3_BUCKET = 'ERROR_ADDING_POLICY_TO_S3_BUCKET',
  UPDATED_ORDER_NUMBER_ERROR = 'UPDATED_ORDER_NUMBER_ERROR',
  PADDLE_NUMBER_NOT_FOUND_ON_AUCTION_ERROR = 'PADDLE_NUMBER_NOT_FOUND_ON_AUCTION_ERROR',
  CAN_NOT_START_AUCTION_WITHOUT_ITEM_ERROR = 'CAN_NOT_START_AUCTION_WITHOUT_ITEM_ERROR',
  CAN_NOT_START_AUCTION_IF_ITEM_IS_WITHOUT_ORDER_NUMBER_ERROR = 'CAN_NOT_START_AUCTION_IF_ITEM_IS_WITHOUT_ORDER_NUMBER_ERROR',
}