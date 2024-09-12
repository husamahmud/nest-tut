import { pgEnum } from 'drizzle-orm/pg-core';

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
