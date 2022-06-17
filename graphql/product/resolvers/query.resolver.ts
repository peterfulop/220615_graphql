import {
  ApolloContext,
  QueryReviewArgs,
  Review,
  UnusedQueryArgs,
} from '../../../types';
import {
  Category,
  Product,
  QueryCategoryArgs,
  QueryProductArgs,
  UnusedQueryParent,
} from '../../../types';
import {
  getProductsByAvgRating,
  isRated,
} from '../../../utils/getProductsByAvgRating';

export const Query = {
  products: (
    _parent: UnusedQueryParent,
    args: QueryProductArgs,
    context: ApolloContext
  ) => {
    const { filter } = args;
    let filteredProducts: Product[] = context.db.products;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product: Product) => {
          return product.onSale;
        });
      }

      if (isRated(avgRating)) {
        filteredProducts = getProductsByAvgRating(
          context.db.reviews,
          filteredProducts,
          avgRating
        );
      }
      return filteredProducts;
    }
    return context.db.products;
  },
  product: (
    _parent: UnusedQueryParent,
    args: QueryProductArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    return context.db.products.find((product: Product) => {
      return product.id === id;
    });
  },
  categories: (
    _parent: UnusedQueryParent,
    _args: UnusedQueryArgs,
    context: ApolloContext
  ) => {
    return context.db.categories;
  },
  category: (
    _parent: UnusedQueryParent,
    args: QueryCategoryArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    return context.db.categories.find((category: Category) => {
      return category.id === id;
    });
  },
  reviews: (
    _parent: UnusedQueryParent,
    _args: UnusedQueryArgs,
    context: ApolloContext
  ) => {
    return context.db.reviews;
  },
  review: (
    _parent: UnusedQueryParent,
    args: QueryReviewArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    return context.db.reviews.find((review: Review) => {
      return review.id === id;
    });
  },
};
