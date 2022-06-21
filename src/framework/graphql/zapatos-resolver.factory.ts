import type { GraphQLFieldResolver } from 'graphql';
import type { JSONSelectableForTable } from 'zapatos/schema';
import type { TableWithID, ZapatosRepo } from '../../repositories/base-repo';

type SubType<TBase, TCondition> = Pick<
  TBase,
  {
    [Key in keyof TBase]: TBase[Key] extends TCondition ? Key : never;
  }[keyof TBase]
>;

type QueryArgs<T> = {
  options: T;
};

export type ResolverFactory<T extends TableWithID> = {
  getAll: GraphQLFieldResolver<
    unknown,
    Record<never, never>,
    QueryArgs<{ limit: number; skip: number } | undefined>
  >;
  getByID: GraphQLFieldResolver<
    JSONSelectableForTable<T>,
    Record<never, never>,
    QueryArgs<Partial<JSONSelectableForTable<T>>>
  >;
  add: GraphQLFieldResolver<
    unknown,
    Record<never, never>,
    QueryArgs<JSONSelectableForTable<T>>
  >;
  updateByID: GraphQLFieldResolver<
    unknown,
    Record<never, never>,
    QueryArgs<JSONSelectableForTable<T>>
  >;
  removeByID: GraphQLFieldResolver<
    unknown,
    Record<never, never>,
    QueryArgs<Partial<JSONSelectableForTable<T>>>
  >;
};

export const zapatosResolverFactory = <T extends TableWithID>(
  repo: ZapatosRepo<TableWithID>,
  fieldName?: keyof SubType<JSONSelectableForTable<T>, string> // TODO: maybe should be moved to getByID,
): ResolverFactory<T> => ({
  getAll: async (_, { options }) => repo.getAll(options),
  getByID: async (parent, { options }) => {
    const fieldValue = (options?.id ||
      (fieldName && parent[fieldName])) as string;
    return repo.getByID(fieldValue as unknown as string);
  },
  add: async (_, { options }) => repo.add(options),
  updateByID: async (_, { options }) =>
    repo.updateByID(options.id as string, { ...options }),
  removeByID: async (_, { options }) => repo.removeByID(options.id as string),
});
