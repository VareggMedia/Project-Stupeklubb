'use client'
import { createClient } from "@/lib/Supabase/client"
import { usePåmelding } from "./påmeldingStruktur"
import sendSkjema from "@/lib/Resend/Resend"
import { useRouter } from "@/src/i18n/navigation"
import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { MEMBER_TYPES } from "./Medlemskap"
import { GENDERS } from "./påmeldingKontaktSkjema"
import countries from 'i18n-iso-countries'

export default function PåmeldingOversikt() {
    const t = useTranslations("Registration")
    const locale = useLocale()
    const { påmelding } = usePåmelding()
    const [sender, setSender] = useState(false)
    const [feilmelding, setFeilmelding] = useState("")
    const supabase = createClient()
    const router = useRouter()

    const tidform = påmelding.fødseldato
    const [år, månde, dag] = tidform.split('-')
    const visDato = `${dag}.${månde}.${år}`
    const vistNasjon = countries.getName(påmelding.nasjon, locale) ?? påmelding.nasjon

    const medlemstype = MEMBER_TYPES.find((m) => m.value === påmelding.medlemstype)
    const kjønn = GENDERS.find((g) => g.value === påmelding.kjønn)

    async function sendPåmelding(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setFeilmelding("")
        setSender(true)
        const {error} = await supabase
            .from("påmelding")
            .insert({
                navn: påmelding.navn,
                fødselsdato: påmelding.fødseldato,
                mobil: påmelding.mobil,
                email: påmelding.email,
                adresse: påmelding.adresse,
                nasjon: påmelding.nasjon,
                kjønn: påmelding.kjønn,
                status: påmelding.medlemstype
            })

        if (error) {
            console.error("Noe gikk galt med Supabase: ", error)
            setFeilmelding(t("summary.error"))
            setSender(false)
            return
        } 
        const resultat = await sendSkjema(påmelding)

        if (!resultat.success) {
            console.error("E-post feilet:", resultat.error)
            router.push("/pamelding/kvittering?epost=feilet")
            return
        }

        router.push("/pamelding/kvittering?epost=true")

    }

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={sendPåmelding}
                className="w-full bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-lg shadow-cyan-100/50 border border-cyan-200/40 p-8 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-cyan-900 text-center">
                    {t("summary.title")}
                </h2>

                {/* Personlig info */}
                <dl className="divide-y divide-cyan-100 rounded-xl bg-cyan-50/40 px-4">
                    {[
                        [t("membership.typeLabel"), medlemstype ? t(`membership.types.${medlemstype.key}`) : påmelding.medlemstype],
                        [t("form.shortName"), påmelding.navn],
                        [t("form.nationality"), vistNasjon],
                        [t("form.gender"), kjønn ? t(`form.genders.${kjønn.key}`) : påmelding.kjønn],
                        [t("form.birthDate"), visDato],
                        [t("form.phone"), påmelding.mobil],
                        [t("form.email"), påmelding.email],
                        [t("form.address"), påmelding.adresse]
                    ].map(([label, value]) => (
                        <div key={label} className="flex justify-between py-3">
                            <dt className="text-sm text-cyan-700">{label}</dt>
                            <dd className="text-sm font-medium text-cyan-950 text-right">
                                {value}
                            </dd>
                        </div>
                    ))}
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
                    {feilmelding && (
                        <p className="text-sm text-red-600 mb-2">{feilmelding}</p>
                    )}
                    <button
                        type="submit"
                        disabled={sender}
                        className={` disabled:opacity-50 disabled:cursor-not-allowed w-full rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-700 active:bg-cyan-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 cursor-pointer `}
                    >
                        {t("summary.submit")}
                    </button>
                </div>
            </form>
        </div>
    )
}