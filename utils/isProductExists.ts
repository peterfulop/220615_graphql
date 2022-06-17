import { ProductItem } from '../types';

export const isProductExists = (
  products: ProductItem[],
  newProduct: ProductItem
) => {
  console.log(newProduct.categoryId);

  return (
    products.findIndex((product: ProductItem) => {
      return (
        product.name === newProduct.name &&
        product.categoryId === newProduct.categoryId
      );
    }) >= 0
  );
};
