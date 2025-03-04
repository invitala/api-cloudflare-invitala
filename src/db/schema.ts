import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

/**
 * Modelos del sistema de base de datos
 */

export const assistant = sqliteTable('assistant', {
  // Modelo de la tabla de asistentes
  id: integer('id').primaryKey(),
  full_name: text('full_name').notNull(),
  comment: text('comment'),
  is_ceremony: integer('is_ceremony', {mode: 'boolean'}).notNull(),
  is_celebration: integer('is_celebration', {mode: 'boolean'}).notNull(),
  num_guests: integer('num_guests').default(0)
});

export const song = sqliteTable('song', {
  // Modelo de la tabla de canciones
  id: integer('id').primaryKey(),
  guest_name: text('guest_name').notNull(),
  song_name: text('song_name').notNull(),
  url: text('url')
});