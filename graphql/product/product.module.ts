import { Category } from './resolvers/category.resolver';
import { Mutation } from './resolvers/mutation.resolver';
import { Product } from './resolvers/product.resolver';
import { Query } from './resolvers/query.resolver';

export const productGQLModule = {
  Query,
  Product,
  Category,
  Mutation,
};
