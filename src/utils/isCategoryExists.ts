import { Category } from '../types/graphql-generated/graphql';

export const isCategoryExists = (
  categories: Category[],
  newCategory: string
) => {
  return (
    categories.findIndex((category) => {
      return category.name.toLowerCase() === newCategory.toLowerCase();
    }) >= 0
  );
};
