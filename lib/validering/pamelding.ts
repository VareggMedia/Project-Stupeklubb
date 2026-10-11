import * as z from "zod"
import countries from "i18n-iso-countries"

export const pameldingSchema = z.object({
    medlemstype: z.enum(["medlem", "passive"]),
    navn: z.string().trim().min(2).max(100),
    kjønn: z.enum(['Gutt', 'Jente', 'Ikke-binær']).nullable(),
    fødseldato: z.iso.date().refine((dato)=> {
        const iDag = new Date().toISOString().slice(0.10)
        return dato <= iDag
    },{
        message: "Fødselsdato kan ikke være i framtiden"
    }),
    mobil: z.string().min(8).max(15).regex(/^[0-9 +]+$/),
    email: z.email().max(254),
    nasjon: z.string().refine((verdi) => countries.isValid(verdi)),
    adresse: z.string().trim().min(1).max(200),
    valg: z.enum(['megSelv', 'andre']),
    melding: z.string().trim().max(1000).optional()
})

export const kontaktSchema = pameldingSchema.pick({
    navn: true,
    kjønn: true,
    fødseldato: true,
    mobil: true,
    email: true,
    nasjon: true,
    adresse: true,
})