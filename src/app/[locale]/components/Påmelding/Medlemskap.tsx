import Select, { StylesConfig } from 'react-select';
import { usePåmelding } from "./påmeldingStruktur";
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
type setStepProp = {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setValg: React.Dispatch<React.SetStateAction<boolean>>;
}
type SelectOption = {
    value: string | null;
    label: string;
}
// Stored values stay Norwegian; only the labels are translated.
export const MEMBER_TYPES = [
    { value: "Medlem", key: "member" },
    { value: "Passiv Medlem", key: "passive" }
] as const

export default function Medlemskap({setStep, setValg}:setStepProp) {
    const t = useTranslations("Registration")
    const {påmelding, setPåmelding} = usePåmelding()
    const options = MEMBER_TYPES.map(({ value, key }) => ({
        value,
        label: t(`membership.types.${key}`),
    }))
    function submit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setStep(1)
    }
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
    const isformfilled = påmelding.medlemstype !== ""
    useEffect(()=>{
            setValg(isformfilled)
        }, [isformfilled, setValg])
    return(
        <div className='w-full bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-lg shadow-cyan-100/50 border border-cyan-200/40 p-8'>
            <div className=''>
                <p>
                  <strong>{t("membership.heading")}</strong>
                  <br/><br/>{t("membership.intro")}
                </p>
                <br/>
                <p>{t("membership.family")}</p>
                <br/>
                <p>{t("membership.fee")}</p>
                <br/>
            </div>
            <div>
                <form onSubmit={submit} className='flex flex-col gap-3'>
                    <label htmlFor="medlem-type" className='font-bold'>{t("membership.typeLabel")}</label>
                    <Select<SelectOption, false> 
                        inputId="medlem-type"
                        instanceId={"medlem-type"}
                        placeholder={t("membership.typePlaceholder")}
                        options={options}
                        styles={selectStyles}
                        value={options.find(
                            (option) => option.value === påmelding.medlemstype
                        ) ?? null}
                        onChange={(valgt) => {
                            setPåmelding((prev) => ({
                                ...prev,
                               medlemstype : valgt?.value ?? ''
                            }));
                        }}
                    />
                    <button 
                        type="submit"
                        disabled={!isformfilled}
                        className="
                            w-full
                            rounded-xl
                            bg-cyan-600
                            px-4 py-3
                            text-sm font-semibold text-white
                            hover:bg-cyan-700 active:bg-cyan-800
                            transition-colors
                            focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2
                            disabled:bg-cyan-300 disabled:cursor-not-allowed
                            cursor-pointer
                            mt-10"
                    >
                        {t("next")}
                    </button>
                </form>
            </div>
        </div>
    )
}