import { drizzle } from 'drizzle-orm/d1';
import { song } from './db/schema';
import { Hono } from 'hono'

export type Env = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>()

app.get('/song', async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(song);
  return c.json(result);
})

export default app
