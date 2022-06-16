import { ApolloContext } from '../../../apollo';
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
    let filteredProducts: Product[] = context.products;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product: Product) => {
          return product.onSale;
        });
      }

      if (isRated(avgRating)) {
        filteredProducts = getProductsByAvgRating(
          context.reviews,
          filteredProducts,
          avgRating
        );
      }
      return filteredProducts;
    }
    return context.products;
  },
  product: (
    _parent: UnusedQueryParent,
    args: QueryProductArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    return context.products.find((product: Product) => {
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
    return context.categories.find((category: Category) => {
      return category.id === id;
    });
  },
};
