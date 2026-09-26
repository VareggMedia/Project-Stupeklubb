import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonStyles } from "./components/button";
import WaveDivider from "./components/WaveDivider";
import Sponsors from "./components/Sponsors";
import { DOORS } from "./data/club";

/**
 * BERGEN STUPEKLUBB — redesigned landing page
 * Rebuilt from bergenstupeklubb.no with an original aquatic visual identity.
 */

const HERO_STATS = [
  {
    title: "Alle aldre",
    text: "Nybegynner til konkurransestuper, tilpasset ditt nivå.",
  },
  { title: "ADO Arena", text: "Lungegårdskaien 40, midt i Bergen sentrum." },
  { title: "Trygt miljø", text: "Erfarne trenere og en klubb som stiller opp." },
];

export default function App() {
  return (
    <div>
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-[radial-gradient(120%_10%_at_6%_1%,rgba(73,214,198,0.55)_50%,rgba(13,107,126,0.65)_60%,rgba(8,33,41,0.33)_20%),url('/images/diver4.avif')] bg-cover bg-center pt-35 pb-36 max-[900px]:pb-28"
        id="om-oss"
      >
        <div className="wrap grid grid-cols-[1.05fr_0.95fr] items-center gap-10 pb-17.5 max-[900px]:grid-cols-1">
          <div>
            <span className="mb-5.5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-aqua">
              <span className="size-1.5 rounded-full bg-aqua" />
              Bergens eneste stupeklubb
            </span>
            <h1 className="max-w-[12ch] text-[clamp(38px,5.4vw,60px)] leading-[1.04] text-foam">
              Vannets vakreste sport begynner her
            </h1>
            <p className="mt-5.5 max-w-[42ch] text-[18px] text-foam/78">
              La vannets vakreste sport utfordre deg! Bli en del av gjengen i
              Bergen Stupeklubb.
            </p>
            <div className="mt-13.5 flex gap-7.5 border-t border-line-dark pt-6.5 max-[900px]:flex-wrap max-[900px]:gap-y-5">
              {HERO_STATS.map((s) => (
                <div
                  key={s.title}
                  className="max-w-[16ch] text-[13.5px] text-foam/65"
                >
                  <strong className="mb-0.75 block font-display text-[15px] text-foam">
                    {s.title}
                  </strong>
                  {s.text}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <WaveDivider color="var(--color-foam)" />
        </div>
      </section>

      {/* DOORS — guide new and existing members to their own page */}
      <section className="relative z-10 -mt-24 max-[900px]:-mt-16">
        <div className="wrap grid grid-cols-2 gap-7 max-[900px]:grid-cols-1 max-[900px]:gap-4">
          <Door
            door={DOORS.new}
            text="For deg som vil prøve, eller forelder som vil finne riktig kurs til barnet sitt."
            cta="Finn ditt kurs"
            tone="aqua"
          />
          <Door
            door={DOORS.members}
            text="Treningstider, stevner og resultater, samlet på ett sted."
            cta="Til medlemssiden"
            tone="pool"
          />
        </div>
      </section>

      {/* INCLUSIVITY */}
      <section className="bg-foam pt-22.5 pb-16 text-center">
        <div className="mx-auto max-w-160 px-7">
          <h2 className="text-[clamp(24px,3vw,30px)]">
            I Bergen Stupeklubb er alle velkomne
          </h2>
          <p className="mt-4 text-[16.5px] text-muted">
            Å tilpasse trening til deg eller dine er aldri noe problem. Trenerne
            våre er erfarne i akkurat det. Velkommen skal du være.
          </p>
        </div>
      </section>

      {/* NEWS, ABOUT, CONTACT — shared by both doors */}
      <section className="bg-foam pb-22.5">
        <div className="wrap grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          <SharedCard
            href="/nyheter"
            title="Nyheter"
            text="Treningsoppdateringer, konkurranseresultater og andre gode nyheter fra klubben."
            cta="Les siste nytt"
          />
          <SharedCard
            href="/om-klubben"
            title="Om klubben"
            text="Hvem vi er, trenerne våre og sponsorene som gjør det mulig."
            cta="Les om klubben"
          />
          <SharedCard
            href="/kontakt"
            title="Kontakt"
            text="ADO Arena, Lungegårdskaien 40. Vi digger spørsmål."
            cta="Ta kontakt"
          />
        </div>
      </section>

      <Sponsors />
      <WaveDivider flip={false} color="var(--color-ink)" />

      {/* CONTACT */}
    </div>
  );
}

function Door({
  door,
  text,
  cta,
  tone,
}: {
  door: (typeof DOORS)[keyof typeof DOORS];
  text: string;
  cta: string;
  tone: "aqua" | "pool";
}) {
  const isAqua = tone === "aqua";
  return (
    <div
      className={`flex flex-col gap-4.5 rounded-3xl p-11 shadow-[0_20px_40px_rgba(8,33,41,0.18)] max-[900px]:p-7 ${
        isAqua ? "bg-aqua text-ink" : "bg-pool text-foam"
      }`}
    >
      <span
        className={`text-[15px] font-semibold ${isAqua ? "" : "text-aqua"}`}
      >
        {door.eyebrow}
      </span>
      <h2 className="text-[clamp(34px,4vw,48px)] leading-none">
        {door.label}
      </h2>
      <p className="max-w-[40ch] text-[17px]">{text}</p>
      <div className="mt-1 grid grid-cols-2 gap-2.5 max-[480px]:grid-cols-1">
        {door.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors duration-150 ${
              isAqua
                ? "bg-white/45 hover:bg-white/70"
                : "border border-line-dark bg-white/8 hover:border-aqua"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        href={door.href}
        className={`${buttonStyles.base} mt-2 self-start rounded-full ${
          isAqua
            ? "bg-ink text-foam hover:bg-pool"
            : "bg-foam text-ink hover:bg-white"
        }`}
      >
        {cta}
        <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}

function SharedCard({
  href,
  title,
  text,
  cta,
}: {
  href: string;
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-[20px] bg-foam-dim p-9 transition-colors duration-150 hover:bg-[#d9e8e5]"
    >
      <h3 className="text-[26px]">{title}</h3>
      <p className="text-base text-muted">{text}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-pool group-hover:underline">
        {cta}
        <ArrowUpRight size={16} />
      </span>
    </Link>
  );
}
