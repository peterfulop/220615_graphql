import { selectOne } from 'zapatos/db';
import { zapatosBaseRepoFactory, ZapatosRepo } from '../base-repo';
import type { RunFragment } from '../../framework/database/create-run-fragment';
import type { JSONSelectableForTable, WhereableForTable } from 'zapatos/schema';

type ProductResource = 'products';
export const ProductResource = 'products' as const;

export type ProductRepo = ZapatosRepo<ProductResource> & {
  getProductByName: (
    name: string
  ) => Promise<JSONSelectableForTable<ProductResource> | null>;
};

export const productRepoFactory = (runFragment: RunFragment): ProductRepo => {
  const baseRepo = zapatosBaseRepoFactory(ProductResource, runFragment);
  return {
    ...baseRepo,
    getProductByName: async (name) => {
      return (
        (await runFragment(
          selectOne(ProductResource, {
            name,
          } as WhereableForTable<ProductResource>)
        )) ?? null
      );
    },
  };
};
