import { ApolloContext } from '../../../types';
import {
  Category,
  ProductItem,
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
    let filteredProducts: ProductItem[] = context.db.products;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product: ProductItem) => {
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
    return context.db.products.find((product: ProductItem) => {
      return product.id === id;
    });
  },
  categories: (
    _parent: UnusedQueryParent,
    _args: QueryCategoryArgs,
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
};
