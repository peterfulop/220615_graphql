import { ApolloContext } from '../../../types';
import {
  QueryCategoryParents,
  QueryCategoryArgs,
  ProductItem,
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
    let filteredCategoryProducts = context.db.products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product: ProductItem) => {
            return product.onSale;
          }
        );
        return filteredCategoryProducts;
      }

      if (isRated(avgRating)) {
        filteredCategoryProducts = getProductsByAvgRating(
          context.db.reviews,
          filteredCategoryProducts,
          avgRating
        );
      }
    }
    return filteredCategoryProducts;
  },
};
