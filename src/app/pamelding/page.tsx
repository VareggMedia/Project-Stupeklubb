'use client'
import PåmeldingSkjema from "@/components/Påmelding/PåmeldingKontaktSkjema/påmeldingKontaktSkjema";
import PåmeldingOversikt from "@/components/Påmelding/PåmeldingOppsummering/PåmeldingOppsummering";
import { useState } from "react";

export default function Påmelding() {
  const [step, setStep] = useState<number>(1)
  return (
    <div className="py-24 grid justify-center">
      <div className="flex justify-center my-10">
        <h1 className="text-5xl">Påmelding</h1>
      </div>
      <div className="flex justify-evenly items-center">
        <div onClick={()=> setStep(1)} className="font-semibold bg-taupe-300 rounded-t-lg cursor-pointer px-19 py-2">
          <p>Kontaktinfo</p>
        </div>
        <div onClick={()=> setStep(2)} className="font-semibold bg-taupe-300 rounded-t-lg cursor-pointer px-19 py-2">
          <p>Oppsummering</p>
        </div>
      </div>
      <div className="w-130">
        <div className="" >
          {step === 1 &&(
            <section>
              <PåmeldingSkjema setStep={setStep} />
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
  );
}
