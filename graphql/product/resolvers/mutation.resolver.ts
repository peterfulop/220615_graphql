import { ApolloContext } from '../../../apollo';
import { v4 as uuidv4 } from 'uuid';
import {
  UnusedQueryParent,
  CategoryItem,
  QueryAddCategoryArgs,
  QueryAddProductArgs,
  ProductItem,
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

    if (isCategoryExists(context.categories, name)) {
      return;
    }

    context.categories.push(newCategory);
    return newCategory;
  },
  addProduct: (
    _parent: UnusedQueryParent,
    args: QueryAddProductArgs,
    context: ApolloContext
  ) => {
    const { name, description, quantity, image, price, onSale, categoryId } =
      args.input;

    const getCategory = getCategoryData(context.categories, categoryId);
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

    const existsProduct = isProductExists(context.products, newProduct);

    if (existsProduct) {
      console.log(`This product: ${name} is already exists!`);
      return;
    }
    context.products.push(newProduct);
    return newProduct;
  },
};
