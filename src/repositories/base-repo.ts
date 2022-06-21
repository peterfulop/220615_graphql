import { v4 } from 'uuid';
import type { ReturningOptionsForTable } from 'zapatos/db';
import {
  all,
  deletes,
  insert,
  NotExactlyOneError,
  select,
  selectExactlyOne,
  update,
} from 'zapatos/db';
import type {
  ColumnForTable,
  InsertableForTable,
  JSONSelectableForTable,
  Table,
  UpdatableForTable,
  WhereableForTable,
} from 'zapatos/schema';
import type { RunFragment } from '../framework/database/create-run-fragment';

export type TableWithID = {
  [TKey in Table]: 'id' extends ColumnForTable<TKey> ? TKey : never;
}[Table];

export type ZapatosRepo<T extends TableWithID> = {
  getAll(
    options?: { limit: number; skip: number } | null
  ): Promise<JSONSelectableForTable<T>[]>;
  getByID(id: string): Promise<JSONSelectableForTable<T> | null>;
  add(
    resource: InsertableForTable<T> | InsertableForTable<T>[]
  ): Promise<JSONSelectableForTable<T> | JSONSelectableForTable<T>[]>;
  updateByID(
    id: string,
    resource: UpdatableForTable<T>
  ): Promise<JSONSelectableForTable<T>[]>;
  removeByID(id: string): Promise<ReturningOptionsForTable<T, 'id'[], never>[]>;
};

export const zapatosBaseRepoFactory = <T extends TableWithID>(
  resourceType: T,
  runFragment: RunFragment
): ZapatosRepo<T> => ({
  getAll: async (options) => {
    const offset = options?.skip || 0;
    const limit = Math.max(1, Math.min(100, options?.limit ?? 10));
    return await runFragment(select(resourceType, all, { limit, offset }));
  },
  getByID: async (id) => {
    try {
      return await runFragment(
        selectExactlyOne(resourceType, { id } as WhereableForTable<T>)
      );
    } catch (error) {
      if (!(error instanceof NotExactlyOneError)) {
        throw error;
      }
      return null;
    }
  },
  add: async (resource) => {
    const values = Array.isArray(resource)
      ? resource.map((r) => ({ ...r, id: r.id ?? v4() }))
      : [{ ...resource, id: resource.id ?? v4() }];
    return await runFragment(insert(resourceType, values));
  },
  updateByID: async (id, resource) =>
    await runFragment(
      update(resourceType, resource, { id } as WhereableForTable<T>)
    ),
  removeByID: async (id) =>
    await runFragment(
      deletes(resourceType, { id } as WhereableForTable<T>, {
        returning: ['id'],
      })
    ),
});
