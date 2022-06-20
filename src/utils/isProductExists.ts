import { AddProductInput, Product } from '../types/graphql-generated/graphql';

export const isProductExists = (
  products: Product[],
  newProduct: AddProductInput
) => {
  return (
    products.findIndex((product: Product) => {
      return (
        product.name === newProduct.name &&
        product.category?.id === newProduct.categoryId
      );
    }) >= 0
  );
};
