import { ApolloContext } from '../../../types';
import { v4 as uuidv4 } from 'uuid';
import {
  UnusedQueryParent,
  CategoryItem,
  QueryAddCategoryArgs,
  QueryAddProductArgs,
  ProductItem,
  QueryAddReviewArgs,
  Review,
  QueryCategoryDeleteArgs,
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
      return;
    }
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      quantity,
      image,
      price,
      onSale,
      categoryId: getCategory.id,
    } as ProductItem;

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

    const newReview = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId,
    } as Review;

    context.db.reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (
    _parent: UnusedQueryParent,
    args: QueryCategoryDeleteArgs,
    context: ApolloContext
  ) => {
    const { id } = args;
    context.db.categories = context.db.categories.filter(
      (category: Category) => {
        return category.id !== id;
      }
    );
    context.db.products.map((product: ProductItem) => {
      if (product.categoryId === id) return;
    });

    return true;
  },
};
