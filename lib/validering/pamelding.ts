import * as z from "zod"
export const kontaktInfoValidering = z.object({
    medlemstype: z.enum(["medlem", "passive"]),
    navn: z.string(),
    kjønn: z.enum(['gutt', 'jente', 'ikke-binær']).nullable(),
    fødseldato: z.string(),
    mobil: z.string(),
    email: z.string(),
    nasjon: z.string(),
    adresse: z.string(),
    valg: z.enum(['megSelv', 'andre']),
    melding: z.string()
    })