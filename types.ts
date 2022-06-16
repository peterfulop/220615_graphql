export type Product = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  image: string;
  price: number;
  onSale: boolean;
  category: Category;
};

export type Category = {
  id: string;
  name: string;
  products: Product[];
};

export type Review = {
  id: string;
  date: Date;
  title: string;
  comment: string;
  rating: number;
  productId: string;
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

export type QueryReviewParents = {
  id: Scalars['ID'];
};

export type QueryProductParents = {
  id: Scalars['ID'];
  name: string;
  description: string;
  quantity: number;
  image: string;
  price: number;
  onSale: boolean;
  categoryId: string;
};

export type UnusedQueryParent = {};
