'use client'
import { usePåmelding } from "../PåmeldingStruktur/påmeldingStruktur"
import sendSkjema from "@/lib/Resend/Resend"

export default function PåmeldingOversikt() {
    const { påmelding } = usePåmelding()

    const tidform = påmelding.fødseldato
    const [år, månde, dag] = tidform.split('-')
    const visDato = `${dag}.${månde}.${år}`

    async function sendPåmelding(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        await sendSkjema(påmelding)
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-sky-50 to-cyan-100 flex items-center justify-center px-4 py-12">
            <form
                onSubmit={sendPåmelding}
                className="w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-cyan-100/50 border border-cyan-200/40 p-8 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-cyan-900 text-center">
                    Oppsummering
                </h2>

                {/* Personlig info */}
                <dl className="divide-y divide-cyan-100 rounded-xl bg-cyan-50/40 px-4">
                    {[
                        ["Medlemstype", påmelding.medlemstype],
                        ["Navn", påmelding.navn],
                        ["Nasjonalitet", påmelding.nasjon],
                        ["Kjønn", påmelding.kjønn],
                        ["Fødselsdato", visDato],
                        ["Telefon", påmelding.mobil],
                        ["E-post", påmelding.email],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between py-3">
                            <dt className="text-sm text-cyan-700">{label}</dt>
                            <dd className="text-sm font-medium text-cyan-950 text-right">
                                {value}
                            </dd>
                        </div>
                    ))}
                    <div className="flex justify-between py-3">
                        <dt className="text-sm text-cyan-700">Adresse</dt>
                        <dd className="text-sm font-medium text-cyan-950 text-right">
                            <address className="not-italic">
                                {påmelding.adresse}
                            </address>
                        </dd>
                    </div>
                </dl>

                {/* Klubb-info }
                <dl className="divide-y divide-cyan-100 rounded-xl bg-cyan-50/40 px-4">
                    {[
                        ["Familie til aktiv", påmelding.familieTilAktiv],
                        ["Støttepersonell til arrangement", påmelding.støttepersonell],
                        ["Ny i klubben", påmelding.nyIKlubben],
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between py-3">
                            <dt className="text-sm text-cyan-700">{label}</dt>
                            <dd className="text-sm font-medium text-cyan-950 text-right">
                                {value ? "Ja" : "Nei"}
                            </dd>
                        </div>
                    ))}
                </dl>

                {/* Send-knapp */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-700 active:bg-cyan-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 cursor-pointer"
                    >
                        Send påmelding
                    </button>
                </div>
            </form>
        </div>
    )
}