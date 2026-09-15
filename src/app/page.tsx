"use client";
import "./bergen-stupeklubb.css";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
} from "lucide-react";

function InstagramIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M15 8h-2a2 2 0 0 0-2 2v2H9v3h2v7h3v-7h2.2l.8-3H14v-1.6c0-.5.4-.9.9-.9H16V8Z" />
    </svg>
  );
}

/**
 * BERGEN STUPEKLUBB — redesigned landing page
 * Rebuilt from bergenstupeklubb.no with an original aquatic visual identity.
 * Single-file component, custom CSS (no Tailwind), lucide-react icons only.
 */

const NAV_LINKS = [
  // { label: "Om oss", href: "#om-oss" },
  { label: "Nyheter", href: "#nyheter" },
  { label: "Stupskolen", href: "#stupskolen" },
  // { label: "Klubbutstyr", href: "#klubbutstyr" },

  // { label: "Sponsing", href: "#sponsorer" },
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
      {/* NAV */}
      <header className={`nav ${scrolled ? "solid" : ""}`}>
        <div className=" wrap nav-row text-white ">
          <a href="#" className="brand  ">
            <RippleMark />
            Bergen Stupeklubb
          </a>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <button
            className="menu-btn"
            aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={`wrap mobile-panel ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#pamelding" onClick={() => setMenuOpen(false)}>
            Påmelding
          </a>
        </div>
      </header>

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
              <a href="#påmelding" className="btn btn-primary">
                Meld deg på stupskolen
                <ArrowUpRight size={17} />
              </a>
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
      <WaveDivider flip={true} color="white" />

      {/* BODY: feature rows */}
      <section className="body-zone" id="stupskolen">
        <div className="wrap">
          <div
            className="feature-row reverse"
            id="nyheter"
            style={{ borderBottom: "none" }}
          >
            <div className="feature-copy">
              <h2>Hold deg oppdatert</h2>
              <p>
                På nyhetssiden vår skriver vi om alt fra treningsoppdateringer
                og konkurranseresultater til andre gode nyheter fra klubben.
              </p>
              <a href="#" className="btn btn-ghost-light">
                Les siste nytt
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="feature-art alt">
              <img src="/images/divingboard.avif" alt="Bergen Stupeklubb" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS + SAFEGUARDING */}

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
          <div className="sponsor-row">
            {SPONSORS.map((s) => (
              <span key={s}>{s}</span>
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
      <section className="contact-zone" id="kontakt">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <h2>Ta kontakt!</h2>
              <p>
                For oss er det viktig at du føler deg velkommen. Har du spørsmål
                vi ikke har svart på her, vil vi at du skal ta kontakt fort som
                bare rakkeren. Vi digger spørsmål — vi er jo tross alt
                bergensere.
              </p>
              <div className="social-row">
                <a
                  href="https://www.instagram.com/bergendivingclub/"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.facebook.com/bergenstupeklubb"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="mailto:dagligleder@bergen-stupeklubb.no"
                  aria-label="E-post"
                >
                  <Mail size={19} />
                </a>
              </div>
            </div>
            <div className="contact-details">
              <div className="contact-item">
                <Mail className="icon" size={19} />
                <div>
                  <strong>E-post</strong>
                  <a href="mailto:hovedtrener@bergen-stupeklubb.no">
                    hovedtrener@bergen-stupeklubb.no
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <Phone className="icon" size={19} />
                <div>
                  <strong>Telefon</strong>
                  <a href="tel:+4793299995">(+47) 932 99 995</a>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="icon" size={19} />
                <div>
                  <strong>Adresse</strong>
                  <span>ADO Arena, Lungegårdskaien 40, 5015 Bergen</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-links">
              {FOOTER_LINKS.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="footer-brand">
              Bergen Stupeklubb — ADO Arena, Lungegårdskaien 40, 5015 Bergen
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
