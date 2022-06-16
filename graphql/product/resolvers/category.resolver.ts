import { products } from '../../../data/data';
import {
  QueryCategoryParents,
  QueryCategoryArgs,
  ApolloContext,
} from '../../../types';

export const Category = {
  products: (
    parent: QueryCategoryParents,
    _args: QueryCategoryArgs,
    _context: ApolloContext
  ) => {
    const { id } = parent;
    return products.filter((product) => {
      return product.categoryId === id;
    });
  },
};
