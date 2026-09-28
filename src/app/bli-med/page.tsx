import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { buttonStyles } from "../components/button";
import PageHeader from "../components/PageHeader";
import { TESTIMONIALS } from "../data/club";

export const metadata: Metadata = {
  title: "Bli med | Bergen Stupeklubb",
  description: "Kurs, priser og alt du trenger for å begynne å stupe.",
};

// TODO: Replace the [BRACKETED] placeholders with the club's real info.
const QUICK_FACTS = [
  { label: "Alder", value: "Fra [X] år til voksen" },
  { label: "Pris", value: "Fra [PRIS] kr / semester" },
  { label: "Hvor", value: "ADO Arena, sentrum" },
  { label: "Forkunnskap", value: "[Må man kunne svømme?]" },
];

const COURSES = [
  {
    age: "[ALDER] år",
    title: "Stupskolen barn",
    text: "[Kort om kurset] · [DAG, TID]",
    cta: { label: "Meld på", href: "/pamelding" },
  },
  {
    age: "[ALDER] år",
    title: "Ungdom",
    text: "[Kort om kurset] · [DAG, TID]",
    cta: { label: "Meld på", href: "/pamelding" },
  },
  {
    age: "18+",
    title: "Voksen",
    text: "[Kort om kurset] · [DAG, TID]",
    cta: { label: "Meld på", href: "/pamelding" },
  },
  {
    age: "Etter avtale",
    title: "Tilpasset trening",
    text: "Trenerne våre tilpasser treningen til deg eller dine.",
    cta: { label: "Ta kontakt", href: "/kontakt" },
  },
];

const PRICES = [
  { label: "Stupskolen barn", price: "[PRIS] kr" },
  { label: "Ungdom", price: "[PRIS] kr" },
  { label: "Voksen", price: "[PRIS] kr" },
  { label: "Medlemskontingent", price: "[PRIS] kr / år" },
];

const BRING = ["[Badetøy]", "[Håndkle]", "[Drikkeflaske]"];

const FIRST_TIME = [
  { title: "Møt opp", text: "[Hvor i ADO Arena, og hvor tidlig]" },
  {
    title: "Treneren tar imot",
    text: "[Hvem møter dere, og kan foreldre se på?]",
  },
  { title: "Treningen", text: "[Hva gjør man første gang, og hvor lenge?]" },
  { title: "Etterpå", text: "[Hvordan man blir fast medlem]" },
];

const QUOTE = TESTIMONIALS.find((t) => t.name === "Synne")!;

export default function BliMed() {
  return (
    <>
      <PageHeader
        title="Ny i klubben? Så enkelt starter du"
        crumb="Bli med"
        tone="aqua"
      >
        <dl className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {QUICK_FACTS.map((f) => (
            <div key={f.label} className="rounded-2xl bg-white/50 px-5 py-4.5">
              <dt className="text-[13px] font-semibold">{f.label}</dt>
              <dd className="mt-1 text-[19px] font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="wrap flex flex-col gap-20 py-20 max-[900px]:gap-14 max-[900px]:py-14">
        <Step id="kurs" number="01" title="Kurs og tilbud etter alder">
          <div className="grid grid-cols-4 gap-5 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
            {COURSES.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-2.5 rounded-[18px] border border-line-light bg-white p-6.5"
              >
                <span className="text-[13px] font-semibold text-muted">
                  {c.age}
                </span>
                <h3 className="text-[23px]">{c.title}</h3>
                <p className="text-[15px] text-muted">{c.text}</p>
                <Link
                  href={c.cta.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[15px] font-semibold text-pool hover:underline"
                >
                  {c.cta.label}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          <Link
            href="/stupskolen"
            className={`${buttonStyles.ghostLight} mt-6`}
          >
            Les mer om stupskolen
            <ArrowUpRight size={16} />
          </Link>
        </Step>

        <Step id="priser" number="02" title="Priser og hva du har med">
          <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
            <dl className="rounded-[18px] border border-line-light bg-white px-8 py-4">
              {PRICES.map((p) => (
                <div
                  key={p.label}
                  className="flex justify-between border-b border-line-light py-3.5 text-base last:border-b-0"
                >
                  <dt>{p.label}</dt>
                  <dd className="font-semibold">{p.price}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-[18px] bg-foam-dim px-8 py-7">
              <h3 className="font-sans text-lg font-semibold">Ta med deg</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {BRING.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Check size={18} className="text-aqua-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-muted">
                Klubbtøy er ikke nødvendig for å begynne. Det kan du kjøpe
                senere.
              </p>
            </div>
          </div>
        </Step>

        <Step id="forste-gang" number="03" title="Første gang? Dette skjer">
          <ol className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {FIRST_TIME.map((s) => (
              <li
                key={s.title}
                className="flex flex-col gap-2.5 border-t-3 border-aqua pt-5"
              >
                <h3 className="text-[21px]">{s.title}</h3>
                <p className="text-[15px] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Step>

        <figure className="flex items-center gap-8 rounded-[20px] border border-line-light bg-white px-11 py-9 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4 max-[900px]:px-7">
          <blockquote className="flex-1 font-display text-[clamp(20px,2.4vw,26px)] leading-snug">
            «{QUOTE.quote}»
          </blockquote>
          <figcaption className="shrink-0 text-[15px] text-muted">
            {QUOTE.name}, {QUOTE.detail}
          </figcaption>
        </figure>

        <section
          id="pamelding"
          className="flex scroll-mt-24 items-center justify-between gap-10 rounded-3xl bg-ink p-14 text-foam max-[900px]:flex-col max-[900px]:items-start max-[900px]:p-8"
        >
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-xl font-bold text-aqua">
                04
              </span>
              <h2 className="text-[clamp(28px,3.4vw,40px)]">
                Klar? Meld deg på
              </h2>
            </div>
            <p className="mt-3 max-w-[50ch] text-[17px] text-foam/80">
              Velg kurs, fyll ut skjemaet, så hører du fra oss. Usikker? Spør
              oss først.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3.5">
            <Link href="/pamelding" className={buttonStyles.primary}>
              Gå til påmelding
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/kontakt" className={buttonStyles.ghostDark}>
              Spør oss
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function Step({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-7 flex items-baseline gap-4">
        <span className="font-display text-xl font-bold text-aqua-deep">
          {number}
        </span>
        <h2 className="text-[clamp(28px,3.4vw,36px)]">{title}</h2>
      </div>
      {children}
    </section>
  );
}
