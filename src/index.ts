import { drizzle } from 'drizzle-orm/d1';
import { song } from './db/schema';
import { Hono } from 'hono'

export type Env = {
  DB: D1Database;
}

const api = new Hono<{ Bindings: Env }>()

api
  .get('/song/', async (c) => {
    try { 
      const db = drizzle(c.env.DB);
      const songs = await db.select().from(song);
      return c.json(songs);
    } catch(error){
        return c.json(
          { error,}, 400
        );
      }
    })
  .post('/song/', async (c) => {
    const body = await c.req.json()

    const new_song = {
      guest_name: body.guest_name as string,
      song_name: body.song_name as string,
      url: body.url as string
    }

    try {
      const db = drizzle(c.env.DB);
      await db.insert(song).values(new_song)

      return new Response('Created', { status: 201 })
    } catch (error) {
      console.log(error)
      return c.json(
        {error}, 400
      );
    }
  })
  
const app = new Hono();
app.route('/api', api);

export default app
