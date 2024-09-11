import {
  pgTable,
  varchar,
  pgEnum,
  timestamp,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core';

export const roles = pgEnum('roles', ['admin', 'user']);
export const genders = pgEnum('genders', ['male', 'female']);
export const accessability = pgEnum('accessability', [
  'blind',
  'sighted',
  'deaf',
  'hearing',
]); // todo: discuss

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

export const schema = { users, communities };
// npx drizzle-kit generate && npx drizzle-kit migrate
