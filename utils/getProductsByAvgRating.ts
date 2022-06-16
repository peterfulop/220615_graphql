import { Product, Review } from '../types';

export const isRated = (avgRating: number) => {
  return [1, 2, 3, 4, 5].includes(avgRating);
};

export const getProductsByAvgRating = (
  reviews: Review[],
  filteredProducts: Product[],
  avgRating: number
): Product[] => {
  return filteredProducts.filter((product: Product) => {
    let sumRating = 0;
    let numberOfReviews = 0;
    reviews.forEach((review: Review) => {
      if (review.productId === product.id) {
        sumRating += review.rating;
        numberOfReviews++;
      }
    });
    const avgProductRating = sumRating / numberOfReviews;
    return avgProductRating >= avgRating;
  });
};
