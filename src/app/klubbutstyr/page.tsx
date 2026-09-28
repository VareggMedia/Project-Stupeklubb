"use client";

import { useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { buttonStyles } from "../components/button";
import FeatureRow from "../components/FeatureRow";
import { RippleMark } from "../components/navbar";
import { FacebookIcon, InstagramIcon } from "../components/footer";

/**
 * BERGEN STUPEKLUBB — redesigned landing page
 * Rebuilt from bergenstupeklubb.no with an original aquatic visual identity.
 */

const NAV_LINKS = [
  { label: "Om oss", href: "#om-oss" },
  { label: "Stupskolen", href: "#stupskolen" },
  { label: "Klubbutstyr", href: "#klubbutstyr" },
  { label: "Nyheter", href: "#nyheter" },
  { label: "Sponsing", href: "#sponsorer" },
  { label: "Kontakt", href: "#kontakt" },
];

const TESTIMONIALS = [
  {
    quote:
      "Jeg synes det er kjempekult å drive med stuping, og jeg trives så godt i klubben.",
    name: "Isak",
    detail: "14 år",
  },
  {
    quote:
      "Det er sinnsykt gøy å være en del av dette miljøet. For meg har stuping blitt en mental balsam hver eneste uke.",
    name: "Vårin",
    detail: "32 år",
  },
  {
    quote:
      "Klubben er en familie — jeg har kjent disse menneskene like lenge som min egen familie.",
    name: "Julie",
    detail: "21 år",
  },
  {
    quote:
      "Det er et veldig fint miljø, og det er kjempegøy å stupe. Både trenerne og de andre stuperne er snille.",
    name: "Synne",
    detail: "12 år",
  },
];

const SPONSORS = ["Zur Hår & Rubb", "Beerenberg", "OBOS", "Rehab.shop"];

const FOOTER_LINKS = [
  { label: "Hjem", href: "#" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Bli medlem", href: "#stupskolen" },
  { label: "Våre trenere", href: "#om-oss" },
  { label: "Sponsing", href: "#sponsorer" },
  { label: "Hva skjer?", href: "#nyheter" },
  { label: "Kontakt oss", href: "#kontakt" },
  { label: "Påmelding", href: "#pamelding" },
];

const HERO_STATS = [
  {
    title: "Alle aldre",
    text: "Nybegynner til konkurransestuper, tilpasset ditt nivå.",
  },
  { title: "ADO Arena", text: "Lungegårdskaien 40, midt i Bergen sentrum." },
  { title: "Trygt miljø", text: "Erfarne trenere og en klubb som stiller opp." },
];

const socialLinkStyles =
  "flex size-10.5 items-center justify-center rounded-full border border-line-dark text-foam transition-colors duration-150 hover:border-aqua hover:text-aqua";

function WaveDivider({ from, to }: { from: string; to: string }) {
  return (
    <svg
      className="block h-15 w-full"
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="0" y="70" width="1200" height="90" fill={from} />
      <path
        d="M0,40 C150,90 350,0 600,35 C850,70 1050,10 1200,45 L1200,90 L0,90 Z"
        fill={to}
      />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 bg-ink py-3 shadow-[0_1px_0_var(--color-line-dark)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-7 text-white">
          <a
            href="#"
            className="flex items-center gap-2.5 font-display text-[30px] font-bold tracking-[0.01em] text-foam"
          >
            <RippleMark />
            Bergen Stupeklubb
          </a>
          <nav className="flex items-center gap-7.5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14.5px] font-medium text-foam/82 transition-colors duration-150 hover:text-yellow"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pamelding"
              className={`${buttonStyles.coral} text-[14.5px]`}
            >
              Påmelding
            </a>
          </nav>
          <button
            className="hidden cursor-pointer p-1 text-foam max-[860px]:block"
            aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div
          className={`wrap hidden flex-col gap-0.5 pt-2.5 pb-1 ${
            menuOpen ? "max-[860px]:flex" : ""
          }`}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line-dark px-1 py-3 text-[15px] text-foam"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pamelding"
            onClick={() => setMenuOpen(false)}
            className="border-b border-line-dark px-1 py-3 text-[15px] text-foam"
          >
            Påmelding
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden bg-[radial-gradient(120%_10%_at_6%_1%,rgba(73,214,198,0.55)_50%,rgba(13,107,126,0.65)_60%,rgba(8,33,41,0.33)_20%),url('/images/diver4.avif')] bg-cover bg-center pt-35 pb-20"
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
            <div className="mt-8.5 flex flex-wrap gap-3.5">
              <a href="#påmelding" className={buttonStyles.primary}>
                Meld deg på stupskolen
                <ArrowUpRight size={17} />
              </a>
              <a href="#stupskolen" className={buttonStyles.ghostDark}>
                Se stupskolen
              </a>
            </div>
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

          <div
            className="relative h-105 max-[900px]:-order-1 max-[900px]:h-65"
            aria-hidden="true"
          >
            <svg viewBox="0 0 420 420" className="size-full">
              <circle
                className="animate-ring-pulse fill-none stroke-aqua/35 stroke-1"
                cx="270"
                cy="330"
                r="40"
              />
              <circle
                className="animate-ring-pulse fill-none stroke-aqua/35 stroke-1 [animation-delay:1.1s]"
                cx="270"
                cy="330"
                r="70"
              />
              <circle
                className="animate-ring-pulse fill-none stroke-aqua/35 stroke-1 [animation-delay:2.2s]"
                cx="270"
                cy="330"
                r="100"
              />

              {/* diving board */}
              <line
                x1="20"
                y1="55"
                x2="130"
                y2="55"
                stroke="rgba(242,248,247,0.35)"
                strokeWidth="2"
              />
              <line
                x1="20"
                y1="55"
                x2="20"
                y2="150"
                stroke="rgba(242,248,247,0.35)"
                strokeWidth="18"
              />

              {/* faint trailing guide for the fall (purely decorative) */}
              <path
                className="fill-none stroke-aqua stroke-2 [stroke-dasharray:4_7]"
                d="M130,55 C205,75 245,190 270,330"
              />

              {/* hidden path the diver actually travels: board run, then the dive */}
              <path
                id="diverPath"
                d="M20,55 L130,55 C205,75 245,190 270,330"
                fill="none"
                stroke="none"
              />

              {/* splash — flashes on at landing, fades before the loop restarts */}
              <g className="stroke-aqua stroke-[1.5] opacity-0 [stroke-linecap:round]">
                <line x1="245" y1="345" x2="235" y2="362" />
                <line x1="295" y1="345" x2="305" y2="362" />
                <line x1="270" y1="350" x2="270" y2="370" />
                <animate
                  attributeName="opacity"
                  values="0;0;1;0.4;0;0"
                  keyTimes="0;0.73;0.76;0.85;0.92;1"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </g>

              {/* the diver: a head + lean-aligned body so the same pose reads as
      "running lean" when horizontal and "streamlined dive" when vertical */}
              <g>
                <circle cx="0" cy="-18" r="6" className="fill-coral" />
                <line
                  x1="0"
                  y1="-12"
                  x2="0"
                  y2="6"
                  className="stroke-coral stroke-5 [stroke-linecap:round]"
                />
                <line
                  x1="0"
                  y1="6"
                  x2="-7"
                  y2="20"
                  className="stroke-coral stroke-4 opacity-75 [stroke-linecap:round]"
                />
                <line
                  x1="0"
                  y1="6"
                  x2="7"
                  y2="20"
                  className="stroke-coral stroke-4 opacity-75 [stroke-linecap:round]"
                />

                <animateMotion
                  dur="4.5s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyTimes="0;0.25;0.45;0.62;0.75;1"
                  keyPoints="0;0.268;0.45;0.70;1;1"
                  calcMode="linear"
                >
                  <mpath xlinkHref="#diverPath" />
                </animateMotion>

                <animate
                  attributeName="opacity"
                  values="1;1;0;0;1"
                  keyTimes="0;0.74;0.76;0.99;1"
                  dur="4.5s"
                  repeatCount="indefinite"
                />
              </g>
            </svg>
          </div>
        </div>
      </section>
      <WaveDivider from="var(--color-ink)" to="var(--color-foam)" />

      {/* BODY: feature rows */}
      <section className="bg-foam" id="stupskolen">
        <div className="wrap">
          <FeatureRow
            title="Meld deg på stupskole for høsten 2026"
            art={
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#146b7e" />
                    <stop offset="1" stopColor="#0d3f4d" />
                  </linearGradient>
                </defs>
                <rect width="400" height="260" fill="url(#g1)" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <path
                    key={i}
                    d={`M0,${210 - i * 14} C100,${190 - i * 14} 300,${230 - i * 14} 400,${200 - i * 14}`}
                    stroke="rgba(73,214,198,0.25)"
                    fill="none"
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            }
          >
            <p>
              Med fokus på fysisk og mental læring utfordrer stuping sider ved
              deg selv du ikke visste fantes. Det tester grenser på en trygg og
              artig måte — midt i hjertet av Bergen.
            </p>
            <p>Vi tilbyr stuping for alle aldre og tilpasser ved behov.</p>
            <a href="#" className={buttonStyles.ghostLight}>
              Les mer om stupskolen
              <ArrowUpRight size={16} />
            </a>
          </FeatureRow>

          <FeatureRow
            title="Aldri prøvd å stupe før?"
            reverse
            lightArt
            art={
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                <circle cx="330" cy="60" r="70" fill="rgba(35,165,150,0.12)" />
                <circle cx="80" cy="210" r="90" fill="rgba(35,165,150,0.08)" />
                <path
                  d="M40,140 Q200,90 380,150"
                  stroke="#23a596"
                  fill="none"
                  strokeWidth="2"
                  strokeDasharray="3 8"
                />
              </svg>
            }
          >
            <p>
              Vi tilbyr en rekke kurs for alle aldersgrupper og
              erfaringsnivåer. Har du aldri stått på et stupebrett før? Vi tar
              godt vare på deg, fra første hopp.
            </p>
            <div className="mt-6.5 flex flex-wrap gap-3.5">
              <a href="#" className={buttonStyles.ghostLight}>
                Les mer om medlemskap
              </a>
              <a href="#pamelding" className={buttonStyles.coral}>
                Meld deg på her
              </a>
            </div>
          </FeatureRow>

          <FeatureRow
            id="klubbutstyr"
            title="Klubbutstyr"
            art={
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#0d3f4d" />
                    <stop offset="1" stopColor="#082129" />
                  </linearGradient>
                </defs>
                <rect width="400" height="260" fill="url(#g2)" />
                <rect
                  x="150"
                  y="70"
                  width="100"
                  height="120"
                  rx="6"
                  fill="none"
                  stroke="#49d6c6"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
                <rect
                  x="170"
                  y="90"
                  width="60"
                  height="80"
                  rx="4"
                  fill="none"
                  stroke="#49d6c6"
                  strokeWidth="1.5"
                  opacity="0.3"
                />
              </svg>
            }
          >
            <p>
              Vi har klubbtøy fra Craft. I nettbutikken finner du
              treningsjakker og -bukser, hettegensere, t-skjorter og shorts fra
              vår egen kolleksjon.
            </p>
            <a href="#" className={buttonStyles.ghostLight}>
              Gå til nettbutikken
              <ArrowUpRight size={16} />
            </a>
          </FeatureRow>

          <FeatureRow
            id="nyheter"
            title="Hold deg oppdatert"
            reverse
            lightArt
            last
            art={
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                {[60, 110, 160, 210].map((y) => (
                  <line
                    key={y}
                    x1="30"
                    y1={y}
                    x2="370"
                    y2={y}
                    stroke="#23a596"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                ))}
                <circle cx="30" cy="60" r="4" fill="#ff6f4d" />
              </svg>
            }
          >
            <p>
              På nyhetssiden vår skriver vi om alt fra treningsoppdateringer og
              konkurranseresultater til andre gode nyheter fra klubben.
            </p>
            <a href="#" className={buttonStyles.ghostLight}>
              Les siste nytt
              <ArrowUpRight size={16} />
            </a>
          </FeatureRow>
        </div>
      </section>
      <WaveDivider from="var(--color-foam)" to="var(--color-ink)" />

      {/* TESTIMONIALS + SAFEGUARDING */}
      <section className="bg-ink py-24">
        <div className="wrap">
          <div className="mb-13 max-w-[46ch]">
            <h2 className="text-[clamp(26px,3vw,34px)] text-foam">
              Hva sier stuperne våre?
            </h2>
            <p className="mt-3.5 text-base text-foam/70">
              Stemmer fra medlemmene — fra ferske nybegynnere til stupere som
              har vokst opp i klubben.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px border border-line-dark bg-line-dark max-[900px]:grid-cols-1">
            {TESTIMONIALS.map((t) => (
              <div className="bg-ink px-8 py-8.5" key={t.name}>
                <p className="mb-4.5 text-[17px] leading-[1.55] text-foam">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-baseline gap-2 text-[14px] font-semibold text-aqua">
                  {t.name}{" "}
                  <span className="font-normal text-foam/50">
                    — {t.detail}
                  </span>
                </footer>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded bg-pool px-9.5 py-8.5">
            <div className="flex items-center gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-aqua/15 text-aqua">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-[19px] text-foam">
                  Vi tar varsler på alvor
                </h3>
                <p className="mt-1 text-[14.5px] text-foam/68">
                  Trygghet for alle stupere er vårt viktigste ansvar.
                </p>
              </div>
            </div>
            <a href="#" className={buttonStyles.ghostDark}>
              Les mer
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <WaveDivider from="var(--color-ink)" to="var(--color-foam)" />

      {/* INCLUSIVITY */}
      <section className="bg-foam py-22.5 text-center">
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

      {/* SPONSORS */}
      <section className="bg-foam pb-24" id="sponsorer">
        <div className="wrap">
          <h2 className="mb-10 text-center font-sans text-[22px] font-semibold text-muted">
            Våre sponsorer
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {SPONSORS.map((s) => (
              <span
                key={s}
                className="font-display text-[18px] font-semibold text-mist"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-9 text-center">
            <a href="#" className={buttonStyles.ghostLight}>
              Les mer om sponsing
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <WaveDivider from="var(--color-foam)" to="var(--color-ink)" />

      {/* CONTACT */}
      <section className="bg-ink pt-24" id="kontakt">
        <div className="wrap">
          <div className="grid grid-cols-[1.2fr_1fr] gap-15 border-b border-line-dark pb-20 max-[900px]:grid-cols-1 max-[900px]:gap-11">
            <div>
              <h2 className="max-w-[12ch] text-[clamp(28px,3.4vw,38px)] text-foam">
                Ta kontakt!
              </h2>
              <p className="mt-4.5 max-w-[44ch] text-base text-foam/70">
                For oss er det viktig at du føler deg velkommen. Har du spørsmål
                vi ikke har svart på her, vil vi at du skal ta kontakt fort som
                bare rakkeren. Vi digger spørsmål — vi er jo tross alt
                bergensere.
              </p>
              <div className="mt-7 flex gap-3.5">
                <a
                  href="https://www.instagram.com/bergendivingclub/"
                  aria-label="Instagram"
                  className={socialLinkStyles}
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.facebook.com/bergenstupeklubb"
                  aria-label="Facebook"
                  className={socialLinkStyles}
                >
                  <FacebookIcon />
                </a>
                <a
                  href="mailto:dagligleder@bergen-stupeklubb.no"
                  aria-label="E-post"
                  className={socialLinkStyles}
                >
                  <Mail size={19} />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-5 text-[15px] text-foam/85 [&_strong]:mb-0.75 [&_strong]:block [&_strong]:text-[13px] [&_strong]:font-semibold [&_strong]:text-foam">
              <div className="flex items-start gap-3.5">
                <Mail className="mt-0.5 shrink-0 text-aqua" size={19} />
                <div>
                  <strong>E-post</strong>
                  <a href="mailto:hovedtrener@bergen-stupeklubb.no">
                    hovedtrener@bergen-stupeklubb.no
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Phone className="mt-0.5 shrink-0 text-aqua" size={19} />
                <div>
                  <strong>Telefon</strong>
                  <a href="tel:+4793299995">(+47) 932 99 995</a>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 shrink-0 text-aqua" size={19} />
                <div>
                  <strong>Adresse</strong>
                  <span>ADO Arena, Lungegårdskaien 40, 5015 Bergen</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 py-9">
            <div className="flex flex-wrap gap-5">
              {FOOTER_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[13.5px] text-foam/55 hover:text-aqua"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="text-[13px] text-foam/40">
              Bergen Stupeklubb — ADO Arena, Lungegårdskaien 40, 5015 Bergen
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
