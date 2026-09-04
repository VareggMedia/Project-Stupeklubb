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

function WaveDivider({ from, to }: { from: string; to: string }) {
  return (
    <svg
      className="wave-divider"
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="1200" height="90" fill={from} />
      <path
        d="M0,40 C150,90 350,0 600,35 C850,70 1050,10 1200,45 L1200,90 L0,90 Z"
        fill={to}
      />
    </svg>
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
        <div className="wrap nav-row">
          <a href="#" className="brand">
            <RippleMark />
            Bergen Stupeklubb
          </a>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            <a href="#pamelding" className="nav-cta">
              Påmelding
            </a>
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
              <a href="#pamelding" className="btn btn-primary">
                Meld deg på stupskolen
                <ArrowUpRight size={17} />
              </a>
              <a href="#stupskolen" className="btn btn-ghost-dark">
                Se stupskolen
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

          <div className="hero-visual" aria-hidden="true">
            <svg viewBox="0 0 420 420">
              <circle className="ring pulse" cx="270" cy="330" r="40" />
              <circle className="ring pulse delay" cx="270" cy="330" r="70" />
              <circle className="ring pulse delay2" cx="270" cy="330" r="100" />

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
              <path className="arc-path" d="M130,55 C205,75 245,190 270,330" />

              {/* hidden path the diver actually travels: board run, then the dive */}
              <path
                id="diverPath"
                d="M20,55 L130,55 C205,75 245,190 270,330"
                fill="none"
                stroke="none"
              />

              {/* splash — flashes on at landing, fades before the loop restarts */}
              <g className="splash-mark">
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
              <g className="diver-figure">
                <circle cx="0" cy="-18" r="6" className="diver-head" />
                <line x1="0" y1="-12" x2="0" y2="6" className="diver-body" />
                <line x1="0" y1="6" x2="-7" y2="20" className="diver-leg" />
                <line x1="0" y1="6" x2="7" y2="20" className="diver-leg" />

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
      <WaveDivider from="var(--ink)" to="var(--foam)" />

      {/* BODY: feature rows */}
      <section className="body-zone" id="stupskolen">
        <div className="wrap">
          <div className="feature-row">
            <div className="feature-copy">
              <h2>Meld deg på stupskole for høsten 2026</h2>
              <p>
                Med fokus på fysisk og mental læring utfordrer stuping sider ved
                deg selv du ikke visste fantes. Det tester grenser på en trygg
                og artig måte — midt i hjertet av Bergen.
              </p>
              <p>Vi tilbyr stuping for alle aldre og tilpasser ved behov.</p>
              <a href="#" className="btn btn-ghost-light">
                Les mer om stupskolen
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="feature-art">
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
            </div>
          </div>

          <div className="feature-row reverse">
            <div className="feature-copy">
              <h2>Aldri prøvd å stupe før?</h2>
              <p>
                Vi tilbyr en rekke kurs for alle aldersgrupper og
                erfaringsnivåer. Har du aldri stått på et stupebrett før? Vi tar
                godt vare på deg, fra første hopp.
              </p>
              <div className="feature-links">
                <a href="#" className="btn btn-ghost-light">
                  Les mer om medlemskap
                </a>
                <a href="#pamelding" className="btn btn-coral">
                  Meld deg på her
                </a>
              </div>
            </div>
            <div className="feature-art alt">
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
            </div>
          </div>

          <div className="feature-row" id="klubbutstyr">
            <div className="feature-copy">
              <h2>Klubbutstyr</h2>
              <p>
                Vi har klubbtøy fra Craft. I nettbutikken finner du
                treningsjakker og -bukser, hettegensere, t-skjorter og shorts
                fra vår egen kolleksjon.
              </p>
              <a href="#" className="btn btn-ghost-light">
                Gå til nettbutikken
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="feature-art">
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
            </div>
          </div>

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
              <svg viewBox="0 0 400 260" preserveAspectRatio="none">
                <line
                  x1="30"
                  y1="60"
                  x2="370"
                  y2="60"
                  stroke="#23a596"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="30"
                  y1="110"
                  x2="370"
                  y2="110"
                  stroke="#23a596"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="30"
                  y1="160"
                  x2="370"
                  y2="160"
                  stroke="#23a596"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <line
                  x1="30"
                  y1="210"
                  x2="370"
                  y2="210"
                  stroke="#23a596"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle cx="30" cy="60" r="4" fill="#ff6f4d" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <WaveDivider from="var(--foam)" to="var(--ink)" />

      {/* TESTIMONIALS + SAFEGUARDING */}
      <section className="dark-zone">
        <div className="wrap">
          <div className="zone-head">
            <h2>Hva sier stuperne våre?</h2>
            <p>
              Stemmer fra medlemmene — fra ferske nybegynnere til stupere som
              har vokst opp i klubben.
            </p>
          </div>
          <div className="quote-grid">
            {TESTIMONIALS.map((t) => (
              <div className="quote-card" key={t.name}>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  {t.name} <span>— {t.detail}</span>
                </footer>
              </div>
            ))}
          </div>

          <div className="safe-banner">
            <div className="left">
              <div className="icon-wrap">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3>Vi tar varsler på alvor</h3>
                <p>Trygghet for alle stupere er vårt viktigste ansvar.</p>
              </div>
            </div>
            <a href="#" className="btn btn-ghost-dark">
              Les mer
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <WaveDivider from="var(--ink)" to="var(--foam)" />

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
      <WaveDivider from="var(--foam)" to="var(--ink)" />

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
