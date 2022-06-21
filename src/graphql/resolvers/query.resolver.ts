import { ApolloContext } from '../../apollo';
import {
  Category,
  Product,
  QueryCategoryArgs,
  QueryProductArgs,
  QueryResolvers,
  QueryReviewArgs,
  Review,
} from '../../types/graphql-generated/graphql';
import {
  getProductsByAvgRating,
  isRated,
} from '../../utils/getProductsByAvgRating';

export const Query: QueryResolvers = {
  products: (_parent, args, context: ApolloContext) => {
    const { filter } = args;
    let filteredProducts: Product[] = context.db.products;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product: Product) => {
          return product.onSale;
        });
      }

      if (isRated(avgRating as number)) {
        filteredProducts = getProductsByAvgRating(
          context.db.reviews,
          filteredProducts,
          avgRating as number
        );
      }
      return filteredProducts;
    }
    return context.db.products;
  },
  product: (_parent, args: QueryProductArgs, context: ApolloContext) => {
    const { id } = args;
    console.log(id);

    return context.db.products.find((product: Product) => {
      return product.id === id;
    });
  },
  categories: (_parent, _args, context: ApolloContext) => {
    return context.db.categories;
  },
  category: (_parent, args: QueryCategoryArgs, context: ApolloContext) => {
    const { id } = args;
    return context.db.categories.find((category: Category) => {
      return category.id === id;
    });
  },
  reviews: (_parent, _args, context: ApolloContext) => {
    return context.db.reviews;
  },
  review: (_parent, args: QueryReviewArgs, context: ApolloContext) => {
    const { id } = args;
    return context.db.reviews.find((review: Review) => {
      return review.id === id;
    });
  },
};
