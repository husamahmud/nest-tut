import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from './users';

export const communities = pgTable('communities', {
  community_id: uuid('community_id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  admin_id: uuid('admin_id')
    .references(() => users.user_id)
    .notNull(),
  visibility: boolean('visibility').default(false).notNull(),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});
