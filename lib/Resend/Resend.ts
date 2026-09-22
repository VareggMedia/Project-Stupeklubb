'use server'
import { Resend } from "resend";
import { PåmeldingData } from "@/components/Påmelding/PåmeldingStruktur/påmeldingStruktur";
import EmailInnhold from "@/components/Påmelding/EmailInnhold/EmailInnhold";
import { createElement } from "react";
interface mailType{
    from: string;
    to: string;
    subject: string;
    react: string;
}


export default async function sendSkjema(data: PåmeldingData): Promise<mailType|undefined> {
    const resend = new Resend(process.env.RESEND_API)
    const {email, navn} = data;

    try{
        const {error} = await resend.emails.send({
            from: 'onboarding@resend.dev', // Denne endres når vi gir den til Stupeklubben, 
            to: `${email}`, // kan kun sende til den adressen dere har på Resend
            subject: `Påmelding for ${navn}`,
            react: createElement(EmailInnhold, {data})
        })

        if (error) {return }
    } catch (error) {
        console.error('Feil med å sende email', error)
    }
}