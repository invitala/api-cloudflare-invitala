import { mysqlTable, serial, text, boolean } from 'drizzle-orm/mysql-core';

export const assistant = mysqlTable('assistant', {
  id: serial('id').primaryKey(),
  full_name: text('full_name').notNull(),
  comment: text('comment'),
  is_ceremony: boolean('is_ceremony').notNull(),
  is_celebration: boolean('is_celebration').notNull()
});

export const song = mysqlTable('song', {
  id: serial('id').primaryKey(),
  guest_name: text('guest_name').notNull(),
  song_name: text('song_name').notNull(),
  url: text('url')
});