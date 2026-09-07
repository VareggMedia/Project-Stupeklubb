/*
'use server';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API)

export async function POST(request: Request) {
    try {
        const {data, error} = await resend.emails.send({
            from: 'Info <info@resend.dev>', //bytt ut seinere
            to: 'mail',
            subject: `Påmelding til ${subject}`,
            html: `
                <h1>Påmelding til ${subject}</h1>
                <p>Takk for din bestilling. Her er dine påmeldings-detaljer:</p>
                <ul>
                    <li><strong>Tjeneste:</strong> ${name}</li>
                    <li><strong>Dato og tid:</strong> ${age}</li>
                </ul>
            `
        })
    } catch {}
}
*/