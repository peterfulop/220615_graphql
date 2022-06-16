import { ApolloContext } from '../../../apollo';
import {
  QueryCategoryArgs,
  QueryProductArgs,
  UnusedQueryParent,
} from '../../../types';

export const Query = {
  products: (
    _parent: UnusedQueryParent,
    _args: QueryProductArgs,
    context: ApolloContext
  ) => {
    return context.products;
  },
  product: (
    _parent: UnusedQueryParent,
    args: QueryProductArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    return context.products.find((product) => {
      return product.id === id;
    });
  },
  categories: (
    _parent: UnusedQueryParent,
    _args: QueryCategoryArgs,
    context: ApolloContext
  ) => {
    return context.categories;
  },
  category: (
    _parent: UnusedQueryParent,
    args: QueryCategoryArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    return context.categories.find((category) => {
      return category.id === id;
    });
  },
};
