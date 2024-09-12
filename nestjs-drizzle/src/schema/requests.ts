import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { communicationTypes, requestTypes } from './enums';
import { users } from './users';

export const requests = pgTable('requests', {
  request_id: uuid('request_id').defaultRandom().primaryKey(),
  user_id: uuid('user_id')
    .references(() => users.user_id)
    .notNull(),
  status: requestTypes('status').default('ignored').notNull(),
  interests: varchar('interests').array().notNull(),
  request_type: communicationTypes('communication_type').notNull(),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});
