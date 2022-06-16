import { ApolloContext } from '../../../apollo';
import { QueryCategoryParents, QueryCategoryArgs } from '../../../types';

export const Category = {
  products: (
    parent: QueryCategoryParents,
    _args: QueryCategoryArgs,
    context: ApolloContext
  ) => {
    const { id } = parent;
    return context.products.filter((product) => {
      return product.category.id === id;
    });
  },
};
