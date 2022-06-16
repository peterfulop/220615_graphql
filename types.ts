export enum PermissionToNumber {
  ADMIN = 1,
  APPRAISER = 2,
  SELLER = 3,
  INTERN = 4,
  OUTSIDER = 5,
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
