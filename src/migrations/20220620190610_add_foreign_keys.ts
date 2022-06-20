import { basename, join } from 'path';
import type { Knex } from 'knex';
import { readSQL } from './utils/read-file';

export const up = async (knex: Knex): Promise<void> => {
  const dirname = join(
    __dirname,
    `./sql/${basename(__filename).replace(/\.ts|\.js$/g, '')}.do.sql`
  );
  await knex.raw(await readSQL(dirname));
};

export const down = async (knex: Knex): Promise<void> => {
  const dirname = join(
    __dirname,
    `./sql/${basename(__filename).replace(/\.ts|\.js$/g, '')}.undo.sql`
  );
  await knex.raw(await readSQL(dirname));
};
