import {
  boolean,
  interval,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// todo userId -> user_id

export const roles = pgEnum('roles', ['admin', 'user']);
export const genders = pgEnum('genders', ['male', 'female']);
export const accessability = pgEnum('accessability', ['blind', 'sighted']);
export const pageTypes = pgEnum('pageTypes', ['news', 'event']);
export const communicationTypes = pgEnum('communicationTypes', [
  'chat',
  'video',
  'audio',
]);
export const requestTypes = pgEnum('requestTypes', ['accepted', 'ignored']);
export const feedbackTypes = pgEnum('feedbackTypes', ['feedback', 'report']);

export const users = pgTable('users', {
  user_id: uuid('user_id').defaultRandom().primaryKey(),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(),
  username: varchar('username').unique().notNull(),
  display_name: varchar('display_name', { length: 50 }).notNull(),
  role: roles('role').default('user').notNull(),
  gender: genders('gender').default('male').notNull(),
  interests: varchar('interests').array().notNull(),
  accessability: accessability('accessability').default('sighted').notNull(),
  country: varchar('country').notNull(),
  language: varchar('language').array().notNull(),
  created_at: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
});

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
      ratingCheck: sql`check (
	  ${table.rating}
	  >=
	  1
	  AND
	  ${table.rating}
	  <=
	  5
	  )`,
    };
  },
);

export const schema = {
  users,
  communities,
  pages,
  podcasts,
  sessions,
  requests,
};
// npx drizzle-kit generate && npx drizzle-kit migrate
