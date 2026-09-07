'use server'
import { Resend } from "resend";
import { PåmeldingData } from "@/components/PåmeldingStruktur/PåmeldingStruktur";

interface mailType{
    from: string;
    to: string;
    subject: string;
    text: string;
}

export default async function sendSkjema(data: PåmeldingData): Promise<mailType|undefined> {
    const resend = new Resend(process.env.RESEND_API)

    const {email, navn, melding, fødseldato, mobil, valg, samtykke
    } = data

    try{
        const {error} = await resend.emails.send({
            from: 'påmelding@gmail.com',
            to: `${email}`,
            subject: `Påmelding for ${navn}`,
            html:`
                <h1><h1>`
        })
        if (error) {
            return 
        }
    } catch (error) {
        return 
    }
}