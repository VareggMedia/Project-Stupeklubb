import { pameldingSchema } from "@/lib/validering/pamelding";
import { createClient } from "@/lib/Supabase/server";
import sendSkjema from "@/lib/Resend/Resend";

export async function POST(request:Request) {
    try {
        const body = await request.json()
        
        const validering = pameldingSchema.safeParse(body)

        if (!validering.success) {
            return Response.json(
                { error: "Ugyldig påmelding" },
                { status: 400 }
            )
        }

        const data = validering.data

        const supabase = await createClient()

        const {error} = await supabase
            .from("påmelding")
            .insert({
                navn: data.navn,
                fødselsdato: data.fødseldato,
                mobil: data.mobil,
                email: data.email,
                adresse: data.adresse,
                nasjon: data.nasjon,
                kjønn: data.kjønn,
                status: data.medlemstype
            })
        if (error) {
            console.error("Supabase-feil", error)

            return Response.json(
                {error: "Kunne ikke lagre påmelding"},
                {status: 500}
            )
        }

        const resultat = await sendSkjema(data)

        if (!resultat.success) {
            return Response.json({
                success: true,
                epost: false
            })
        }

        return Response.json({
            success: true,
            epost: true
        })
    } catch (error) {
        console.error("Uventet feil ved påmelding:", error)

        return Response.json(
            { error: "En uventet feil oppstod" },
            { status: 500 }
        )
    }
}