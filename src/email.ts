import { Hono } from 'hono';


export type Env = {
  DB: D1Database;
}

const api_email = new Hono<{ Bindings: Env }>()


async function sendEmail(to, subject, text) {
    const MAILGUN_API_KEY = 'tu-api-key';
    const MAILGUN_DOMAIN = 'invita.la';
  
    const response = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        from: 'tu-email@tu-dominio.com',
        to,
        subject,
        text
      })
    });
    return response;
  }

api_email
    .post('/email/', async (c) =>{

    })

export default api_email