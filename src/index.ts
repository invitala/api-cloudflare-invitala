import api_assitant from './assistant';
import api_email from './email'
import api_song from './song';
import { Hono } from 'hono'
  
// Routes of API
const app = new Hono();
app.route('/api', api_assitant);
app.route('/api', api_song);
app.route('/email', api_email);

export default app
