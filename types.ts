export enum PermissionToNumber {
  ADMIN = 1,
  USER = 2,
}

export type SessionTokenPayload = {
  userId: string;
  permissionLevel: PermissionToNumber;
  name: string;
  email: string;
  iat: number;
  exp: number;
  sub: string;
};

export type ApolloContext = {
  user: SessionTokenPayload | null;
};
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type QueryProductArgs = {
  id: Scalars['ID'];
};

export type QueryCategoryArgs = {
  id: Scalars['ID'];
};

export type QueryCategoryParents = {
  id: Scalars['ID'];
  name: string;
};

export type QueryProductParents = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  image: string;
  price: number;
  onSale: boolean;
  categoryId: string;
};

export type UnusedQueryParent = {};
