import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from './users';
import { communities } from './communities';
import { pageTypes } from './enums';

export const pages = pgTable('pages', {
  page_id: uuid('page_id').defaultRandom().primaryKey(),
  community_id: uuid('community_id')
    .references(() => communities.community_id)
    .notNull(),
  admin_id: uuid('admin_id')
    .references(() => users.user_id)
    .notNull(),
  page_type: pageTypes('page_type').notNull(),
  title: varchar('title').notNull(),
  content: varchar('content').notNull(),
  page_url: varchar('page_url').notNull(),
  image_url: varchar('image_url').array().notNull(),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});
