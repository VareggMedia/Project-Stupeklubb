"use client";

import "./bergen-stupeklubb.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * BERGEN STUPEKLUBB — redesigned landing page
 * Rebuilt from bergenstupeklubb.no with an original aquatic visual identity.
 * Single-file component, custom CSS (no Tailwind), lucide-react icons only.
 */

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
const SPONSORS = [
  {
    name: "Zur Hår & Rubb",

    image: "/images/sponsor_img/zurhaar.png",
  },

  {
    name: "Beerenberg",

    image: "/images/sponsor_img/beerenberg.png",
  },

  {
    name: "OBOS",

    image: "/images/sponsor_img/obos.png",
  },

  {
    name: "Rehab.shop",

    image: "/images/sponsor_img/rehab_shop.png",
  },
];
const FOOTER_LINKS = [
  { label: "Hjem", href: "#" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Bli medlem", href: "#stupskolen" },
  { label: "Våre trenere", href: "#om-oss" },
  { label: "Sponsing", href: "#sponsorer" },
  { label: "Hva skjer?", href: "/nyheter" },
  { label: "Kontakt oss", href: "/kontakt" },
  { label: "Påmelding", href: "/pamelding" },
];

type WaveDividerProps = {
  flip?: boolean; // true = flipped, use at the bottom of a section
  color?: string; // should match the section it "belongs" to
};

export function WaveDivider({
  flip = false,
  color = "#ffffff",
}: WaveDividerProps) {
  return (
    <div className={`wave-divider ${flip ? "wave-divider--flip" : ""}`}>
      <svg
        className="wave-divider"
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="0" y="50" width="1200" height="90" fill={color} />
        <path
          d="M0,40 C150,90 350,0 600,35 C850,70 1050,10 1200,45 L1200,90 L0,90 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
function RippleMark() {
  return (
    <svg viewBox="0 0 44 44" className="ripple-mark" aria-hidden="true">
      <circle cx="22" cy="22" r="20" />
      <circle cx="22" cy="22" r="13" />
      <circle cx="22" cy="22" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bsk">
      {/* HERO */}
      <section className="hero" id="om-oss">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow-tag">
              <span className="dot" />
              Bergens eneste stupeklubb
            </span>
            <h1>Vannets vakreste sport begynner her</h1>
            <p className="hero-sub">
              La vannets vakreste sport utfordre deg! Bli en del av gjengen i
              Bergen Stupeklubb.
            </p>
            <div className="hero-ctas">
              <Link href="/pamelding" className="btn btn-primary">
                Meld deg på stupskolen
                <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <strong>Alle aldre</strong>
                Nybegynner til konkurransestuper, tilpasset ditt nivå.
              </div>
              <div>
                <strong>ADO Arena</strong>
                Lungegårdskaien 40, midt i Bergen sentrum.
              </div>
              <div>
                <strong>Trygt miljø</strong>
                Erfarne trenere og en klubb som stiller opp.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUSIVITY */}
      <section className="body-zone inclusive">
        <div className="wrap">
          <h2>I Bergen Stupeklubb er alle velkomne</h2>
          <p>
            Å tilpasse trening til deg eller dine er aldri noe problem. Trenerne
            våre er erfarne i akkurat det. Velkommen skal du være.
          </p>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="body-zone sponsors" id="sponsorer">
        <div className="wrap">
          <h2>Våre sponsorer</h2>
          <div className="sponsors">
            {SPONSORS.map((sponsor) => (
              <div className="sponsor-image" key={sponsor.name}>
                <img src={sponsor.image} alt={sponsor.name} />
              </div>
            ))}
          </div>
          <div className="sponsors-cta">
            <a href="#" className="btn btn-ghost-light">
              Les mer om sponsing
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <WaveDivider flip={false} color="var(--ink)" />

      {/* CONTACT */}
    </div>
  );
}
