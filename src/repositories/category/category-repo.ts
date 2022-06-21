import { selectOne } from 'zapatos/db';
import { zapatosBaseRepoFactory, ZapatosRepo } from '../base-repo';
import type { RunFragment } from '../../framework/database/create-run-fragment';
import type { JSONSelectableForTable, WhereableForTable } from 'zapatos/schema';
type CategoryResource = 'categories';
export const CategoryResource = 'categories' as const;

type CategorySetStatusesResource = 'category_set_statuses';
export const CategorySetStatusesResource = 'category_set_statuses' as const;

export type CategoryRepo = ZapatosRepo<CategoryResource> & {
  getFull(
    itemId: string
  ): Promise<JSONSelectableForTable<CategoryResource> | null>;
  getCategoryByName: (
    name: string
  ) => Promise<JSONSelectableForTable<CategoryResource> | null>;
};

export const categoryRepoFactory = (runFragment: RunFragment): CategoryRepo => {
  const baseRepo = zapatosBaseRepoFactory(CategoryResource, runFragment);
  return {
    ...baseRepo,
    getFull: async (itemId) => {
      const item = await baseRepo.getByID(itemId);
      if (item === null) {
        return null;
      }
      return {
        ...item,
      };
    },
    getCategoryByName: async (name) => {
      return (
        (await runFragment(
          selectOne(CategoryResource, {
            name,
          } as WhereableForTable<CategoryResource>)
        )) ?? null
      );
    },
  };
};
