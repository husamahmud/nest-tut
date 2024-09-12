import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from './users';

export const podcasts = pgTable('podcasts', {
  podcast_id: uuid('podcast_id').defaultRandom().primaryKey(),
  admin_id: uuid('admin_id')
    .references(() => users.user_id)
    .notNull(),
  user_id: uuid('user_id')
    .references(() => users.user_id)
    .notNull(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  duration: varchar('duration').notNull(),
  source_url: varchar('source_url').notNull(),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});
