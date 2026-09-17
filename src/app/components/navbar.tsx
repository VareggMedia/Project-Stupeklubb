"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  // { label: "Om oss", href: "#om-oss" },
  { label: "Nyheter", href: "/nyheter" },
  { label: "Stupskolen", href: "/stupskolen" },
  // { label: "Klubbutstyr", href: "#klubbutstyr" },

  // { label: "Sponsing", href: "#sponsorer" },
  { label: "Kontakt", href: "/kontakt" },
];
function RippleMark() {
  return (
    <svg viewBox="0 0 44 44" className="ripple-mark" aria-hidden="true">
      <circle cx="22" cy="22" r="20" />
      <circle cx="22" cy="22" r="13" />
      <circle cx="22" cy="22" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}
export default function Navbar() {
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
      <header className={`nav ${scrolled ? "solid" : ""}`}>
        <div className=" wrap nav-row text-white ">
          <Link href="/" className="brand  ">
            <RippleMark />
            Bergen Stupeklubb
          </Link>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
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
    </div>
  );
}
