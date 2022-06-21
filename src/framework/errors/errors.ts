import type { ValidationResult } from 'fastify';
import { DetailedError } from './detailed-error';
import { ErrorCode } from './error-code';

export class NotFoundError extends DetailedError {
  constructor(private entityName: string) {
    super(ErrorCode.NOT_FOUND);
  }

  getDetails(): Record<string, unknown> {
    return {
      entityName: this.entityName,
    };
  }
}

export class ValidationError extends DetailedError {
  constructor(private errors: ValidationResult[]) {
    super(ErrorCode.VALIDATION_ERROR);
  }

  getDetails(): Record<string, unknown> {
    return { errors: this.errors };
  }
}

export interface ViolaterKeyValue {
  key: string;
  value: string | number;
}

export class DuplicationError extends DetailedError {
  constructor(
    private entityName: string,
    private violaterKeyValue: ViolaterKeyValue | ViolaterKeyValue[]
  ) {
    super(ErrorCode.DUPLICATE_KEY_VALUE_VIOLATES_UNIQUE_CONSTRAINT);
  }

  getDetails(): Record<string, unknown> {
    return {
      entityName: this.entityName,
      violaterKeyValue: this.violaterKeyValue,
    };
  }
}

export class UpdateOrderNumberError extends DetailedError {
  constructor(private entityName: unknown) {
    super(ErrorCode.UPDATED_ORDER_NUMBER_ERROR);
  }

  getDetails(): Record<string, unknown> {
    return {
      entityName: this.entityName,
    };
  }
}

export class DeleteFileError extends DetailedError {
  constructor(private entityName: string) {
    super(ErrorCode.REMOVING_FILE_ERROR);
  }

  getDetails(): Record<string, unknown> {
    return {
      entityName: this.entityName,
    };
  }
}

export class CanNotStartAuctionWithOutItemError extends Error {
  constructor() {
    super(ErrorCode.CAN_NOT_START_AUCTION_WITHOUT_ITEM_ERROR);
  }
}
export class CanNotStartAuctionIfItemIsWithoutOrderNumberError extends DetailedError {
  constructor(private entityName: unknown) {
    super(
      ErrorCode.CAN_NOT_START_AUCTION_IF_ITEM_IS_WITHOUT_ORDER_NUMBER_ERROR
    );
  }

  getDetails(): Record<string, unknown> {
    return {
      entityName: this.entityName,
    };
  }
}

export class SetUpS3BucketPolicyError extends DetailedError {
  constructor(private entityName: string) {
    super(ErrorCode.ERROR_ADDING_POLICY_TO_S3_BUCKET);
  }

  getDetails(): Record<string, unknown> {
    return {
      entityName: this.entityName,
    };
  }
}
