import { sql } from 'drizzle-orm';
import {
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { users } from './users';
import { sessions } from './sessions';
import { feedbackTypes } from './enums';

export const feedbacks = pgTable(
  'feedbacks',
  {
    feedback_id: uuid('feedback_id').defaultRandom().primaryKey(),
    feedbacker_id: uuid('feedbacker_id')
      .references(() => users.user_id)
      .notNull(),
    reported_id: uuid('reported_id')
      .references(() => users.user_id)
      .notNull(),
    session_id: uuid('session_id')
      .references(() => sessions.session_id)
      .notNull(),
    rating: smallint('rating').notNull(),
    feedback_type: feedbackTypes('feedback_type').notNull(),
    content: varchar('content').notNull(),
    created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(
      () => new Date(),
    ),
  },
  // todo: discuss -> [app level constraints, enum]
  (table) => {
    return {
      ratingCheck: sql`check ( ${table.rating} >= 1 AND ${table.rating} <= 5 )`,
    };
  },
);
