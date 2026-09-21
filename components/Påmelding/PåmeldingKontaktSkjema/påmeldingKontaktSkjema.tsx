'use client'
import { PåmeldingData, usePåmelding } from "../PåmeldingStruktur/påmeldingStruktur";
import { useRouter } from "next/navigation";
import Select, { StylesConfig } from 'react-select';
import countries from 'i18n-iso-countries'
import norsk from 'i18n-iso-countries/langs/nb.json'

countries.registerLocale(norsk)

type SelectOption = {
    value: string | null;
    label: string;
}

const landnavn = countries.getNames('nb', { select: 'official' })
const alternativer = Object.entries(landnavn).map(
    ([kode, navn]) => ({
        value: kode,
        label: navn,
    })
)
const defaultland = alternativer.find((land) => land.value === 'NO')

export default function PåmeldingSkjema() {
    const { påmelding, setPåmelding } = usePåmelding();
    const router = useRouter()

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push('/')
    }

    const kjønnvalg: {
        value: PåmeldingData['kjønn'];
        label: string;
    }[] = [
        { value: 'Gutt', label: 'Gutt' },
        { value: 'Jente', label: 'Jente' },
        { value: 'Ikke-binær', label: 'Ikke-binær' }
    ]

    const isFormValid = (
        påmelding.navn !== '' &&
        påmelding.fødseldato !== '' &&
        påmelding.email !== '' &&
        påmelding.mobil !== ''
    );

    const inputStyle = "w-full rounded-lg border border-cyan-200 bg-white/70 px-3 py-2 text-sm text-cyan-950 placeholder:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors"

    const labelStyle = "block text-sm font-medium text-cyan-700 mb-1"

    const selectStyles: StylesConfig<SelectOption> = {
        control: (base, state) => ({
            ...base,
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderColor: state.isFocused ? 'transparent' : '#a5f3fc',
            borderRadius: '0.5rem',
            boxShadow: state.isFocused ? '0 0 0 2px #22d3ee' : 'none',
            fontSize: '0.875rem',
            '&:hover': { borderColor: '#67e8f9' },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#0891b2' : state.isFocused ? '#ecfeff' : 'white',
            color: state.isSelected ? 'white' : '#164e63',
            fontSize: '0.875rem',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#083344',
        }),
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-sky-50 to-cyan-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-cyan-100/50 border border-cyan-200/40 p-8">
                <h2 className="text-2xl font-semibold text-cyan-900 text-center mb-6">
                    Påmelding
                </h2>
                <form onSubmit={submit} className="space-y-4">
                    <section className="space-y-4">
                        <div>
                            <label className={labelStyle} htmlFor="navn">Fullt navn</label>
                            <input
                                id="navn"
                                type="text"
                                className={inputStyle}
                                value={påmelding.navn}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        navn: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div>
                            <label className={labelStyle} htmlFor="nasjon">Nasjonalitet</label>
                            <Select<SelectOption, false>
                                inputId="nasjon"
                                instanceId="nasjon"
                                defaultValue={defaultland}
                                options={alternativer}
                                styles={selectStyles}
                                onChange={(valgt) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        nasjon: valgt?.value ?? ''
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label className={labelStyle} htmlFor="valg">Kjønn</label>
                            <Select<SelectOption, false>
                                inputId="valg"
                                instanceId="kjønn"
                                options={kjønnvalg}
                                styles={selectStyles}
                                onChange={(valgt) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        kjønn: (valgt?.value ?? null) as PåmeldingData['kjønn']
                                    }))
                                }}
                            />
                        </div>

                        <div>
                            <label className={labelStyle} htmlFor="bursdag">Fødselsdato</label>
                            <input
                                id="bursdag"
                                type="date"
                                className={inputStyle}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        fødseldato: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div>
                            <label className={labelStyle} htmlFor="email">E-post</label>
                            <input
                                id="email"
                                type="email"
                                className={inputStyle}
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
                            <label className={labelStyle} htmlFor="mobil">Mobil</label>
                            <input
                                id="mobil"
                                type="text"
                                className={inputStyle}
                                value={påmelding.mobil}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        mobil: e.target.value
                                    }))
                                }}
                            />
                        </div>

                        <div>
                            <label className={labelStyle} htmlFor="adresse">Adresse</label>
                            <input
                                id="adresse"
                                type="text"
                                className={inputStyle}
                                onChange={(e) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        adresse: e.target.value
                                    }))
                                }}
                            />
                        </div>
                    </section>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="w-full rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-700 active:bg-cyan-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 disabled:bg-cyan-300 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Send inn påmelding
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
