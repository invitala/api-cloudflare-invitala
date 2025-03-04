import { api_assitant } from './view/assistant';
import { api_song } from './view/song';
import { api_email } from './emails/emails';
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth';


type Bindings = {
    TOKEN_API: string
}

// declarar la app principal
const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

// middleware de token
app.use('/api/*', (c, next) =>{
    const tokenMiddleware = bearerAuth({ token: c.env.TOKEN_API })
    return tokenMiddleware(c, next)
})

// rutas de mi app principal
app.route('/', api_assitant);
app.route('/', api_song);
app.route('/', api_email);

export default app
    