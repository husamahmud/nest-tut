import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { roles, genders, accessability } from './enums';

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
