import { categories } from '../../../data/data';
import {
  QueryProductParents,
  QueryCategoryArgs,
  ApolloContext,
} from '../../../types';

export const Product = {
  category: (
    parent: QueryProductParents,
    _args: QueryCategoryArgs,
    _context: ApolloContext
  ) => {
    const { categoryId } = parent;
    return categories.find((category) => {
      return category.id === categoryId;
    });
  },
};
