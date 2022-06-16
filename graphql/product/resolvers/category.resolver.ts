import { ApolloContext } from '../../../apollo';
import {
  QueryCategoryParents,
  QueryCategoryArgs,
  Product,
} from '../../../types';
import {
  getProductsByAvgRating,
  isRated,
} from '../../../utils/getProductsByAvgRating';

export const Category = {
  products: (
    _parent: QueryCategoryParents,
    args: QueryCategoryArgs,
    context: ApolloContext
  ) => {
    const { filter } = args;
    let filteredCategoryProducts = context.products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product: Product) => {
            return product.onSale;
          }
        );
        return filteredCategoryProducts;
      }

      if (isRated(avgRating)) {
        filteredCategoryProducts = getProductsByAvgRating(
          context.reviews,
          filteredCategoryProducts,
          avgRating
        );
      }
    }
    return filteredCategoryProducts;
  },
};
