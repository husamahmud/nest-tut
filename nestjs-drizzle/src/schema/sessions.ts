import { interval, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { communicationTypes } from './enums';
import { users } from './users';

export const sessions = pgTable('sessions', {
  session_id: uuid('session_id').defaultRandom().primaryKey(),
  request_id: uuid('request_id').notNull(),
  volunteer_id: uuid('volunteer_id')
    .references(() => users.user_id)
    .notNull(),
  duration: interval('duration').notNull(),
  session_type: communicationTypes('communication_type').notNull(),
  feedback_id: uuid('feedback_id'),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});
