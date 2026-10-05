'use client'
import { PåmeldingData, usePåmelding } from "./påmeldingStruktur";
import Select, { StylesConfig } from 'react-select';
import countries from 'i18n-iso-countries'
import norsk from 'i18n-iso-countries/langs/nb.json'
import english from 'i18n-iso-countries/langs/en.json'
import React, { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";

countries.registerLocale(norsk)
countries.registerLocale(english)

type SelectOption = {
    value: string | null;
    label: string;
}
type setStepProp = {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setKontakt: React.Dispatch<React.SetStateAction<boolean>>;
}
// Stored values stay Norwegian; only the labels are translated.
export const GENDERS: readonly { value: PåmeldingData['kjønn'], key: "boy" | "girl" | "nonBinary" }[] = [
    { value: 'Gutt', key: 'boy' },
    { value: 'Jente', key: 'girl' },
    { value: 'Ikke-binær', key: 'nonBinary' }
]


export default function PåmeldingSkjema({setStep, setKontakt}: setStepProp) {
    const t = useTranslations("Registration")
    const locale = useLocale()
    const { påmelding, setPåmelding } = usePåmelding();
    // Country codes are stored; names follow the page language
    const landnavn = countries.getNames(locale, { select: 'official' })
    const alternativer = Object.entries(landnavn).map(
        ([kode, navn]) => ({
            value: kode,
            label: navn,
        })
    )
    function submit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setStep(2)
    }

    const kjønnvalg = GENDERS.map(({ value, key }) => ({
        value,
        label: t(`form.genders.${key}`),
    }))

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

    useEffect(()=>{
        setKontakt(isFormValid)
    }, [isFormValid, setKontakt])

    return (
        <div className="flex items-center justify-center">
            <div className="w-full bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-lg shadow-cyan-100/50 border border-cyan-200/40 p-8">
                <form onSubmit={submit} className="space-y-4">
                    <section className="space-y-4">
                        <div>
                            <label className={labelStyle} htmlFor="navn">{t("form.name")}</label>
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
                            <label className={labelStyle} htmlFor="nasjon">{t("form.nationality")}</label>
                            <Select<SelectOption, false>
                                inputId="nasjon"
                                instanceId="nasjon"
                                value={alternativer.find(
                                    (option) => option.value === påmelding.nasjon
                                ) ?? null}
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
                            <label className={labelStyle} htmlFor="kjonn">{t("form.gender")}</label>
                            <Select<SelectOption, false>
                                inputId="kjonn"
                                instanceId="kjonn"
                                placeholder={t("form.genderPlaceholder")}
                                options={kjønnvalg}
                                styles={selectStyles}
                                value={kjønnvalg.find(
                                    (option) => option.value === påmelding.kjønn
                                ) ?? null}
                                onChange={(valgt) => {
                                    setPåmelding((prev) => ({
                                        ...prev,
                                        kjønn: (valgt?.value ?? null) as PåmeldingData['kjønn']
                                    }))
                                }}
                            />
                        </div>

                        <div>
                            <label className={labelStyle} htmlFor="bursdag">{t("form.birthDate")}</label>
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
                            <label className={labelStyle} htmlFor="email">{t("form.email")}</label>
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
                            <label className={labelStyle} htmlFor="mobil">{t("form.mobile")}</label>
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
                            <label className={labelStyle} htmlFor="adresse">{t("form.address")}</label>
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
                            {t("next")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
