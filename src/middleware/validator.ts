import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// Validador de datos de asistentes
const zValidatorAssistant = z.object({
    full_name: z.string().min(1),
    comment: z.string().min(1),
    is_ceremony: z.boolean(),
    is_celebration: z.boolean()
});

// Validador de datos de canciones
const zValidatorSong = z.object({
    guest_name: z.string().min(1),
    song_name: z.string().min(1),
    url: z.string().min(1)
});

export const zAssistant = zValidator('json', zValidatorAssistant);
export const zSong = zValidator('json', zValidatorSong);