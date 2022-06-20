import { Category } from '../types';

export const getCategoryData = (categories: Category[], categoryId: string) => {
  return categories.find((category: Category) => {
    return category.id === categoryId;
  });
};
