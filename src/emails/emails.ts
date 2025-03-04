import { Hono } from "hono"
import { Resend } from "resend"
import { drizzle } from "drizzle-orm/d1"
import { assistant, song } from "../db/schema"
import { weekly_info_template, welcome_template } from "./email_templates"

type Env = {
    DB: D1Database;
}

const api_email = new Hono<{ Bindings: Env }>()

api_email
    .get('/send_email_resum/', async (c) =>{
        const resend = new Resend(c.env.TOKEN_RESEND);
        try{
            // get all assistants and songs from db
            const db = drizzle(c.env.DB);
            const assistantList = await db.select().from(assistant);
            const songsList = await db.select().from(song);

            const data = await resend.emails.send({
                from: 'Invita.La <dev@invita.la>',
                to: ['vicblack15@hotmail.com'],
                subject: 'Resumen Semanal del Evento',
                html: weekly_info_template(assistantList, songsList)
              });

              return c.json({ message: 'Email sent successfully', data });
        } catch (error) {
            return c.json({
                message: 'Failed to send email, error: ', error
            }, 500)
        }
    })
    .get('/send_email_welcome/', async (c) =>{
        try{
            const resend = new Resend(c.env.TOKEN_RESEND);
            // testing data
            const userName = 'Arturo y Maria';
            const systemUrl = 'https://invita.la';
            const whatsappNumber = '123456789';

            const data = await resend.emails.send({
                from: 'Invita.La <dev@invita.la>',
                to: ['vicblack15@hotmail.com'],
                subject: 'Bienvenido a Invita.La',
                html: welcome_template(userName, systemUrl, whatsappNumber),
              });

              return c.json({ message: 'Email sent successfully', data });
        } catch (error) {
            return c.json({
                message: 'Failed to send email, error: ', error
            }, 500)
        }
    })

export { api_email }