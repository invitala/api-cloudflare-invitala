import { api_assitant } from './view/assistant';
//import api_email from './email'
import { api_song } from './view/song';
import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth';


type Bindings = {
    TOKEN_API: string
}

// declarar la app principal
const app = new Hono<{ Bindings: Bindings }>();

// middleware de token
app.use('/api/*', (c, next) =>{
    const tokenMiddleware = bearerAuth({ token: c.env.TOKEN_API })
    console.log(c.env.TOKEN_API)
    return tokenMiddleware(c, next)
})

// rutas de mi app principal
app.route('/api', api_assitant);
app.route('/api', api_song);
//app.route('/email', api_email);

export default app
    