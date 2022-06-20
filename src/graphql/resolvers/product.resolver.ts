import { ApolloContext } from '../../apollo';
import {
  AddReviewInput,
  Category,
  ProductResolvers,
} from '../../types/graphql-generated/graphql';

export const Product: ProductResolvers = {
  category: (parent, _args, context: ApolloContext) => {
    const { id: categoryId } = parent;
    return context.db.categories.find((category: Category) => {
      return category.id === categoryId;
    });
  },
  reviews: (parent, _args, context: ApolloContext) => {
    const { id } = parent;
    return context.db.reviews.filter((review: AddReviewInput) => {
      return review.productId === id;
    });
  },
};
