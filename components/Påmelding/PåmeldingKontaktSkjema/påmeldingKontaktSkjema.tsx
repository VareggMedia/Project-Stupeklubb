'use client'
import { PåmeldingData, usePåmelding } from "../PåmeldingStruktur/påmeldingStruktur";
import { useRouter } from "next/navigation";
import Select from 'react-select';
import countries from 'i18n-iso-countries'
import norsk from 'i18n-iso-countries/langs/nb.json'

countries.registerLocale(norsk)

const landnavn = countries.getNames('nb', {select:'official'})
const alternativer = Object.entries(landnavn).map(
    ([kode, navn]) => ({
        value: kode,
        label: navn,
    })
)

export default function PåmeldingSkjema() {
    
    const {påmelding, setPåmelding} = usePåmelding();
    const router = useRouter()
    
    function submit (e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        router.push('/')
    }

    const kjønnvalg: {
        value: PåmeldingData['kjønn'];
        label: string;
    }[] = [
        {value: 'Gutt', label: 'Gutt'},
        {value: 'Jente', label: 'Jente'},
        {value: 'Ikke-binær', label: 'Ikke-binær'}
    ]

    const isFormValid = (
        påmelding.navn !== '' &&
        påmelding.fødseldato !== '' &&
        påmelding.email !== '' &&
        påmelding.mobil !== ''
    );

    return (
        <div>
            <div>
                <form onSubmit={submit}>
                    <section>
                        <div>
                            <label htmlFor="navn">Fulle Navn:</label>
                            <input
                                id="navn"
                                type="text"
                                value={påmelding.navn}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="valg">Kjønn:</label>
                            <Select
                                inputId="valg"
                                instanceId='kjønn'
                                options={kjønnvalg}
                                onChange={(valgt) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        kjønn: valgt?.value ?? null
                                    }))
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="nasjon">Nasjonalitet:</label>
                            <Select
                                inputId="nasjon"
                                instanceId='nasjon'
                                options={alternativer}
                                onChange={(valgt) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        nasjon: valgt?.value ?? ''
                                    }));
                                }}

                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                value={påmelding.email}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        email: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="mobil">Mobil:</label>
                            <input
                                id='mobil'
                                type="text"
                                value={påmelding.mobil}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        mobil: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        
                    </section>
                    <div>
                        <button disabled={!isFormValid} >Send in Påmelding</button>
                    </div>
                </form>
            </div>
        </div>
    )
}