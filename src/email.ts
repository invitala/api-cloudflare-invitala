import { Resend } from "resend";
import { Hono } from 'hono'


export type Env = {
  DB: D1Database;
}

const api_email = new Hono<{ Bindings: Env }>


export default {
  // Method to send email to pass request, env and ctx  
  async fetch(request, env, ctx) {
    const resend = new Resend("your_resend_api_key");

    const { data, error } = await resend.emails.send({
      from: "hello@invita.la",
      to: "victorlara@logicsystems.com.mx",
      subject: "Hello World",
      html: "<p>Hello from Workers</p>",
    });

    return Response.json({ data, error });
  },
};

