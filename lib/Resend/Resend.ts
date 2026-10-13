import "server-only"
import { Resend } from "resend";
import { PåmeldingData } from "@/src/app/[locale]/components/Påmelding/påmeldingStruktur";
import EmailInnhold from "@/src/app/[locale]/components/Påmelding/EmailInnhold";
import { createElement } from "react";

type sendResult = {
    success: boolean;
    error?: string
}

export default async function sendSkjema(data: PåmeldingData): Promise<sendResult> {
    const resend = new Resend(process.env.RESEND_API)
    const {email, navn} = data;

    try{
        const {error} = await resend.emails.send({
            from: 'onboarding@resend.dev', // Denne endres når vi gir den til Stupeklubben, 
            to: `${email}`, // kan kun sende til den adressen dere har på Resend
            subject: `Påmelding for ${navn}`,
            react: createElement(EmailInnhold, {data})
        })

        if (error) {
            return {
                success: false,
                error: error.message
                
            }
        }

        return {
            success: true
        }
    } catch (error) {
        console.error('Feil med å sende email', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        }
    }
}