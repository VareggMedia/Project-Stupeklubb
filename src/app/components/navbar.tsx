"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/club";
export function RippleMark() {
  return (
    <svg
      viewBox="0 0 44 44"
      className="size-6.5 shrink-0 fill-none stroke-current stroke-[1.6] text-aqua"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="20" />
      <circle cx="22" cy="22" r="13" />
      <circle cx="22" cy="22" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink py-3 shadow-[0_1px_0_var(--color-line-dark)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-7 text-white">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[30px] font-bold tracking-[0.01em] text-foam"
        >
          <RippleMark />
          Bergen Stupeklubb
        </Link>
        <div className="flex items-center gap-5.5 max-[860px]:hidden">
          <nav className="flex items-center gap-7.5">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`text-[14.5px] font-medium transition-colors duration-150 hover:text-yellow ${
                  isActive(l.href) ? "text-aqua" : "text-foam/82"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
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
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`border-b border-line-dark px-1 py-3 text-[15px] ${
              isActive(l.href) ? "text-aqua" : "text-foam"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/pamelding"
          onClick={() => setMenuOpen(false)}
          className="border-b border-line-dark px-1 py-3 text-[15px] text-foam"
        >
          Påmelding
        </Link>
      </div>
    </header>
  );
}
