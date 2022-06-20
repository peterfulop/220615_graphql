import { Category } from '../types/graphql-generated/graphql';

export const getCategoryData = (categories: Category[], categoryId: string) => {
  return categories.find((category: Category) => {
    return category.id === categoryId;
  });
};
