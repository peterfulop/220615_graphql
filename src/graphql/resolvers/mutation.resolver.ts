import { v4 as uuidv4 } from 'uuid';
import { ApolloContext } from '../../apollo';
import {
  UnusedQueryParent,
  QueryAddCategoryArgs,
  CategoryItem,
  QueryAddProductArgs,
  Product,
  QueryAddReviewArgs,
  Review,
  QueryDeleteArgs,
  Category,
  QueryUpdateCategoryArgs,
  QueryUpdateProductArgs,
  QueryUpdateReviewArgs,
} from '../../types';
import { getCategoryData } from '../../utils/getCategoryData';
import { isCategoryExists } from '../../utils/isCategoryExists';
import { isProductExists } from '../../utils/isProductExists';

export const Mutation = {
  addCategory: (
    _parent: UnusedQueryParent,
    args: QueryAddCategoryArgs,
    context: ApolloContext
  ) => {
    const { name } = args.input;
    const newCategory: CategoryItem = {
      id: uuidv4(),
      name,
    };

    if (isCategoryExists(context.db.categories, name)) {
      return;
    }

    context.db.categories.push(newCategory);
    return newCategory;
  },
  addProduct: (
    _parent: UnusedQueryParent,
    args: QueryAddProductArgs,
    context: ApolloContext
  ) => {
    const { name, description, quantity, image, price, onSale, categoryId } =
      args.input;

    const getCategory = getCategoryData(context.db.categories, categoryId);
    if (!getCategory) {
      console.log('getCategoryData', getCategory);
      return undefined;
    }
    const newProduct: Product = {
      id: uuidv4(),
      name,
      description,
      quantity,
      image,
      price,
      onSale,
      categoryId: getCategory.id,
    };

    const existsProduct = isProductExists(context.db.products, newProduct);

    if (existsProduct) {
      console.log(`This product: ${name} is already exists!`);
      return;
    }
    context.db.products.push(newProduct);
    return newProduct;
  },
  addReview: (
    _parent: UnusedQueryParent,
    args: QueryAddReviewArgs,
    context: ApolloContext
  ) => {
    const { date, title, comment, rating, productId } = args.input;

    const newReview: Review = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    context.db.reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (
    _parent: UnusedQueryParent,
    args: QueryDeleteArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    context.db.categories = context.db.categories.filter(
      (category: Category) => {
        return category.id !== id;
      }
    );
    context.db.products.map((product: Product) => {
      if (product.categoryId === id) {
        return {
          ...product,
          categoryId: null,
        };
      } else return product;
    });

    return true;
  },
  deleteProduct: (
    _parent: UnusedQueryParent,
    args: QueryDeleteArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    context.db.products = context.db.products.filter((product: Product) => {
      return product.id !== id;
    });
    context.db.reviews = context.db.reviews.filter((review: Review) => {
      return review.productId !== id;
    });
    return true;
  },
  deleteReview: (
    _parent: UnusedQueryParent,
    args: QueryDeleteArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    console.log(id);

    context.db.reviews = context.db.reviews.filter((review: Review) => {
      return review.id !== id;
    });
    return true;
  },
  updateCategory: (
    _parent: UnusedQueryParent,
    args: QueryUpdateCategoryArgs,
    context: ApolloContext
  ) => {
    const { id, input } = args;
    const index = context.db.categories.findIndex(
      (category: Category) => category.id === id
    );
    if (index === -1) return null;
    context.db.categories[index] = {
      ...context.db.categories[index],
      ...input,
    };
    return context.db.categories[index];
  },
  updateProduct: (
    _parent: UnusedQueryParent,
    args: QueryUpdateProductArgs,
    context: ApolloContext
  ) => {
    const { id, input } = args;
    const index = context.db.products.findIndex(
      (product: Product) => product.id === id
    );
    if (index === -1) return null;
    context.db.products[index] = {
      ...context.db.products[index],
      ...input,
    };
    return context.db.products[index];
  },
  updateReview: (
    _parent: UnusedQueryParent,
    args: QueryUpdateReviewArgs,
    context: ApolloContext
  ) => {
    const { id, input } = args;
    const index = context.db.reviews.findIndex(
      (reviews: Review) => reviews.id === id
    );
    if (index === -1) return null;
    context.db.reviews[index] = {
      ...context.db.reviews[index],
      ...input,
    };
    return context.db.reviews[index];
  },
};
