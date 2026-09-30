'use server'
import { Resend } from "resend";
import { PåmeldingData } from "@/src/app/components/Påmelding/påmeldingStruktur";
import EmailInnhold from "@/src/app/components/Påmelding/EmailInnhold";
import { createElement } from "react";

type sendResult = {
    success: boolean;
    error?: unknown
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
                error
                
            }
        }

        return {
            success: true
        }
    } catch (error) {
        console.error('Feil med å sende email', error)
        return {
            success: false,
            error
        }
    }
}