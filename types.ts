export type DB = {
  products: Product[];
  categories: Category[];
  reviews: Review[];
};
export type Category = {
  id: string;
  name: string;
  products?: Product[];
};

export type CategoryItem = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  image: string;
  price: number;
  onSale: boolean;
  categoryId: string;
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

export type FilterProductArgs = {
  onSale: boolean;
  avgRating: number;
};

export type QueryProductArgs = {
  id: Scalars['ID'];
  filter: FilterProductArgs;
};

export type QueryCategoryArgs = {
  id: Scalars['ID'];
  filter: FilterProductArgs;
};

export type QueryReviewArgs = {
  id: Scalars['ID'];
};

export type QueryDeleteArgs = {
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

export type AddCategoryInput = {
  name: string;
};

export type QueryAddCategoryArgs = {
  input: AddCategoryInput;
};

export type AddProductInput = {
  name: string;
  description: string;
  quantity: number;
  image: string;
  price: number;
  onSale: boolean;
  categoryId: string;
};

export type QueryAddProductArgs = {
  input: AddProductInput;
};

export type AddReviewInput = {
  date: Date;
  title: string;
  comment: string;
  rating: number;
  productId: string;
};

export type QueryAddReviewArgs = {
  input: AddReviewInput;
};

export type UpdateCategoryInput = {
  name: string;
};

export type QueryUpdateCategoryArgs = {
  id: Scalars['ID'];
  input: UpdateCategoryInput;
};

export type UpdateProductInput = {
  name: string;
  description: string;
  quantity: number;
  image: string;
  price: number;
  onSale: boolean;
  categoryId: string;
};

export type QueryUpdateProductArgs = {
  id: Scalars['ID'];
  input: UpdateProductInput;
};

export type UpdateReviewInput = {
  date: Date;
  title: string;
  comment: string;
  rating: number;
};

export type QueryUpdateReviewArgs = {
  id: Scalars['ID'];
  input: UpdateReviewInput;
};

export type UnusedQueryParent = {};
export type UnusedQueryArgs = {};
