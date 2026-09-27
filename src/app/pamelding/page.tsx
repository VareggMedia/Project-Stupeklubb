'use client'
import PåmeldingSkjema from "@/components/Påmelding/PåmeldingKontaktSkjema/påmeldingKontaktSkjema";
import PåmeldingOversikt from "@/components/Påmelding/PåmeldingOppsummering/PåmeldingOppsummering";
import { useState } from "react";

export default function Påmelding() {
  const [step, setStep] = useState<number>(1)
  return (
    <div className="py-24 grid justify-center">
      <div className="">
        <h1 className="">Påmelding</h1>
      </div>
      <div className="w-140">
        <h1>hei</h1>
        <div className="" onClick={()=> setStep(2)}>
          {step === 1 &&(
          <section>
            <PåmeldingSkjema setStep={setStep} />
          </section>)}
        </div>
        <div onClick={()=> setStep(1)}>
          {step === 2 &&(
          <section>
            <PåmeldingOversikt />
          </section>)}
        </div>
      </div>
    </div>
  );
}
