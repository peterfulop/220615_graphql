import { Product } from '../types';

export const isProductExists = (products: Product[], newProduct: Product) => {
  console.log(newProduct.categoryId);

  return (
    products.findIndex((product: Product) => {
      return (
        product.name === newProduct.name &&
        product.categoryId === newProduct.categoryId
      );
    }) >= 0
  );
};
