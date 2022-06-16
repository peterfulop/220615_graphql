import { ApolloContext } from '../../../apollo';
import {
  QueryProductParents,
  QueryCategoryArgs,
  QueryReviewParents,
} from '../../../types';

export const Product = {
  category: (
    parent: QueryProductParents,
    _args: QueryCategoryArgs,
    context: ApolloContext
  ) => {
    const { categoryId } = parent;
    return context.categories.find((category) => {
      return category.id === categoryId;
    });
  },
  reviews: (
    parent: QueryReviewParents,
    _args: QueryCategoryArgs,
    context: ApolloContext
  ) => {
    const { id } = parent;
    return context.reviews.filter((review) => {
      return review.productId === id;
    });
  },
};
