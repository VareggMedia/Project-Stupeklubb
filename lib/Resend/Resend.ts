'use server'
import { Resend } from "resend";
import { PåmeldingData } from "@/components/Påmelding/PåmeldingStruktur/påmeldingStruktur";

interface mailType{
    from: string;
    to: string;
    subject: string;
    react: string;
}

export default async function sendSkjema(data: PåmeldingData): Promise<mailType|undefined> {
    const resend = new Resend(process.env.RESEND_API)

    const {email, navn, kjønn, fødseldato, nasjon, mobil, valg, samtykke, medlemstype, adresse
    } = data

    try{
        const {error} = await resend.emails.send({
            from: 'påmelding@gmail.com',
            to: `${email}`,
            subject: `Påmelding for ${navn}`,
            react:`
                <h1><h1>
                <div>
                    <dl>
                        <div>
                            <dt>Medlemstype</dt>
                            <dd> ${medlemstype} </dd>
                        </div>
                        <div>
                            <dt>Navn</dt>
                            <dd> ${navn} </dd>
                        </div>
                        <div>
                            <dt>Nasjonalitet</dt>
                            <dd> ${nasjon} </dd>
                        </div>
                        <div>
                            <dt>Kjønn</dt>
                            <dd> ${kjønn} </dd>
                        </div>
                        <div>
                            <dt>Fødselsdato</dt>
                            <dd> ${fødseldato} </dd>
                        </div>
                        <div >
                            <dt>Telefon</dt>
                            <dd> ${mobil} </dd>
                        </div>
                        <div>
                            <dt>E-post</dt>
                            <dd> ${email} </dd>
                        </div>
                        <div >
                            <dt>Adresse</dt>
                            <dd >
                                <address>
                                    ${adresse}
                                </address>
                            </dd>
                        </div>
                    </dl>
                    <dl></dl>
                    <dl>
                        <div >
                            <dt>Familie til aktiv</dt>
                            <dd ></dd>
                        </div>
                        <div >
                            <dt>Støttepersonell til arrangement</dt>
                            <dd ></dd>
                        </div>
                        <div >
                            <dt>Ny i klubben</dt>
                            <dd></dd>
                        </div>
                    </dl>
                </div>`
        })
    } catch (error) {
        console.error('Feil med å sende email', error)
        return 
    }
}