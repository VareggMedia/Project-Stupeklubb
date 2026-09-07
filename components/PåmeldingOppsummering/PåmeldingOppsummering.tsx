import { usePåmelding } from "../PåmeldingStruktur/PåmeldingStruktur"
import sendSkjema from "@/lib/Resend/Resend"



export default function PåmeldingOversikt() {
    const {påmelding} = usePåmelding()

    async function sendPåmelding() {
        await sendSkjema(påmelding)
    } 
    return (
        <>
            <form onSubmit={sendPåmelding}>
                <div>
                    <dl>
                        <div>
                            <dt>Medlemstype</dt>
                            <dd> {påmelding.medlemstype} </dd>
                        </div>
                        <div>
                            <dt>Navn</dt>
                            <dd> {påmelding.navn} </dd>
                        </div>
                        <div>
                            <dt>Nasjonalitet</dt>
                            <dd> {} </dd>
                        </div>
                        <div>
                            <dt>Kjønn</dt>
                            <dd> {} </dd>
                        </div>
                        <div>
                            <dt>Fødselsdato</dt>
                            <dd > {påmelding.fødseldato} </dd>
                        </div>
                        <div >
                            <dt>Telefon</dt>
                            <dd > {påmelding.mobil} </dd>
                        </div>
                        <div >
                            <dt>E-post</dt>
                            <dd > {påmelding.email} </dd>
                        </div>
                        <div >
                            <dt>Adresse</dt>
                            <dd >
                                <address>
                                    {påmelding.adresse}
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
                </div>
                <div>
                    <button></button>
                </div>
            </form>
        </>
    )
}