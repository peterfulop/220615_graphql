import { selectOne } from 'zapatos/db';
import { zapatosBaseRepoFactory, ZapatosRepo } from '../base-repo';
import type { RunFragment } from '../../framework/database/create-run-fragment';
import type { JSONSelectableForTable, WhereableForTable } from 'zapatos/schema';

type CategoryResource = 'categories';
export const CategoryResource = 'categories' as const;

export type CategoryRepo = ZapatosRepo<CategoryResource> & {
  getCategoryByName: (
    name: string
  ) => Promise<JSONSelectableForTable<CategoryResource> | null>;
};

export const categoryRepoFactory = (runFragment: RunFragment): CategoryRepo => {
  const baseRepo = zapatosBaseRepoFactory(CategoryResource, runFragment);
  return {
    ...baseRepo,
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
