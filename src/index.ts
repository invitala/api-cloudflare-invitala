import { api_assitant } from './assistant';
//import api_email from './email'
import { api_song } from './song';
import { Hono } from 'hono'
  

// declarar la app principal
const app = new Hono();


// rutas de mi app principal
app.route('/api', api_assitant);
app.route('/api', api_song);
//app.route('/email', api_email);

export default app
    