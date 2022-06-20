import {
  AddCategoryInput,
  AddProductInput,
  AddReviewInput,
  Category,
  Product,
  Review,
} from './graphql-generated/graphql';

export type DB = {
  products: Array<any>;
  categories: Array<any>;
  reviews: Array<any>;
};
