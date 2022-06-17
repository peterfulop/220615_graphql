import { ApolloContext, QueryDeleteArgs } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import {
  UnusedQueryParent,
  CategoryItem,
  QueryAddCategoryArgs,
  QueryAddProductArgs,
  Product,
  QueryAddReviewArgs,
  Review,
  Category,
} from '../../../types';
import { isCategoryExists } from '../../../utils/isCategoryExists';
import { isProductExists } from '../../../utils/isProductExists';
import { getCategoryData } from '../../../utils/getCategoryData';

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
};
