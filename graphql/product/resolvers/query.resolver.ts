import { products, categories } from '../../../data/data';
import {
  ApolloContext,
  QueryCategoryArgs,
  QueryCategoryParents,
  QueryProductArgs,
  UnusedQueryParent,
} from '../../../types';

export const Query = {
  products: (
    _parent: UnusedQueryParent,
    _args: QueryProductArgs,
    _context: ApolloContext
  ) => {
    return products;
  },
  product: (
    _parent: UnusedQueryParent,
    args: QueryProductArgs,
    _context: ApolloContext
  ) => {
    const { id } = args;
    return products.find((product) => {
      return product.id === id;
    });
  },
  categories: (
    _parent: QueryCategoryParents,
    _args: QueryCategoryArgs,
    _context: ApolloContext
  ) => {
    return categories;
  },
  category: (
    _parent: UnusedQueryParent,
    args: QueryCategoryArgs,
    _context: ApolloContext
  ) => {
    const { id } = args;
    return categories.find((category) => {
      return category.id === id;
    });
  },
};
