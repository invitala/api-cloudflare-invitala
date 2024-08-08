import { Hono } from 'hono'

export type Env = {
  MY_VAR: string;
  DATABASE_URL: string;
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.text(`Hello Hono!, ${c.env.DATABASE_URL}`)
})

export default app
