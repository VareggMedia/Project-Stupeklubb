'use client'
import PåmeldingSkjema from "@/src/app/[locale]/components/Påmelding/påmeldingKontaktSkjema";
import PåmeldingOversikt from "@/src/app/[locale]/components/Påmelding/PåmeldingOppsummering";
import { useState } from "react";
import Medlemskap from "../components/Påmelding/Medlemskap";

export default function Påmelding() {
  const [step, setStep] = useState<number>(0)
  const [kontakt, setKontakt] = useState(false)
  const [valg, setValg] = useState(false)
  return (
    <div className="py-24 flex flex-col items-center px-4">
      <div className="flex justify-center my-10">
        <h1 className="text-5xl">Påmelding</h1>
      </div>
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-1">
          <button type="button" onClick={()=> setStep(0)} className={`flex-1 text-center font-semibold bg-taupe-300 rounded-t-lg cursor-pointer ${step === 0 ? "opacity-100" : "opacity-50"} py-2`}>
            <p>Medlemskap</p>
          </button>
          <button disabled={!valg} type="button" onClick={()=> {
            if (valg) setStep(1)
            }} className={`flex-1 text-center font-semibold bg-taupe-300 rounded-t-lg ${valg ? "cursor-pointer" : "cursor-not-allowed"} ${step === 1 ? "opacity-100" : "opacity-50"} py-2`}>
            <p>Kontaktinfo</p>
          </button>
          <button disabled={!valg || !kontakt} type="button" onClick={()=> {
            if (valg && kontakt) setStep(2)
          }} className={`flex-1 text-center font-semibold bg-taupe-300 rounded-t-lg ${valg && kontakt ? "cursor-pointer" : "cursor-not-allowed"} ${step === 2 ? "opacity-100" : "opacity-50" } py-2`}>
            <p>Oppsummering</p>
          </button>
        </div>
        <div>
          <div>
            {step === 0 &&(
            <section>
              <Medlemskap setStep={setStep} setValg={setValg}/>
            </section>)}
          </div>
          <div>
            {step === 1 &&(
              <section>
                <PåmeldingSkjema setStep={setStep} setKontakt={setKontakt}/>
              </section>
            )}
          </div>
          <div>
            {step === 2 &&(
              <section>
                <PåmeldingOversikt />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
