import type { Parameter } from 'zapatos/db';
import { param } from 'zapatos/db';

export const likeParam = (val: string): Parameter<string> => param(`%${val}%`);

export type ResultLimits = {
  skip: number;
  limit: number;
};

export type Count = {
  count: string;
};

export enum Sort {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Asc = 'asc',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Desc = 'desc',
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum SearchItemsOrderByOptions {
  Name = 'name',
  SequentialNumber = 'sequentialNumber',
  AuctionNumber = 'auctionNumber',
  Type = 'type',
  StatusName = 'statusName',
  StartingPrice = 'startingPrice',
  KnockdownPrice = 'knockdownPrice',
  Classification = 'classification',
  DateOfRegister = 'dateOfRegister',
  PaddleNumber = 'paddleNumber',
  OrderNumber = 'orderNumber',
}
/* eslint-enable @typescript-eslint/naming-convention */

export const UNIQUE_KEY_VIOLATION_ERROR_CODE = '23505';

export const UNIQUE_PADDLE_NUMBER_CONSTRAINT = 'unique_paddle_number';
