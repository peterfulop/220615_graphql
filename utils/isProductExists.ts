import { Product, ProductItem } from '../types';

export const isProductExists = (
  products: Product[],
  newProduct: ProductItem
) => {
  console.log(newProduct.categoryId);

  return (
    products.findIndex((product: Product) => {
      return product.name === newProduct.name;
    }) >= 0
  );
};
