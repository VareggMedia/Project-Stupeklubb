import { PåmeldingData } from "../PåmeldingStruktur/påmeldingStruktur";

type EmailProp = {
    data: PåmeldingData
}

export default function EmailInnhold( {data} : EmailProp ) {

    const {medlemstype, navn, nasjon, kjønn, fødseldato, mobil, email, adresse} = data;

    return (
        <>
            <h1></h1>
            <div>
                <dl>
                    <div>
                        <dt>Medlemstype</dt>
                        <dd> {medlemstype} </dd>
                    </div>
                    <div>
                        <dt>Navn</dt>
                        <dd> {navn} </dd>
                    </div>
                    <div>
                        <dt>Nasjonalitet</dt>
                        <dd> {nasjon} </dd>
                    </div>
                    <div>
                        <dt>Kjønn</dt>
                        <dd> {kjønn} </dd>
                    </div>
                    <div>
                        <dt>Fødselsdato</dt>
                        <dd> {fødseldato} </dd>
                    </div>
                    <div >
                        <dt>Telefon</dt>
                        <dd> {mobil} </dd>
                    </div>
                    <div>
                        <dt>E-post</dt>
                        <dd> {email} </dd>
                    </div>
                    <div >
                        <dt>Adresse</dt>
                        <dd >
                            <address>
                                {adresse}
                            </address>
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    )
}