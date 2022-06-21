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

import type { RunFragment } from '../framework/database/create-run-fragment';
