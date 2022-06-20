import { ApolloContext } from '../../apollo';
import {
  CategoryProductsArgs,
  CategoryResolvers,
  Product,
} from '../../types/graphql-generated/graphql';
import {
  getProductsByAvgRating,
  isRated,
} from '../../utils/getProductsByAvgRating';

export const Category: CategoryResolvers = {
  products: (_source, args: CategoryProductsArgs, context: ApolloContext) => {
    const { filter } = args;
    let filteredCategoryProducts = context.db.products;
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

      if (isRated(avgRating as number)) {
        filteredCategoryProducts = getProductsByAvgRating(
          context.db.reviews,
          filteredCategoryProducts,
          avgRating as number
        );
      }
    }
    return filteredCategoryProducts;
  },
};
