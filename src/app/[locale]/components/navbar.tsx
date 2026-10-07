"use client";
import { Link, usePathname } from "@/src/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Open mobile menu: lock page scroll; close on Escape, outside tap, or desktop width
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const close = () => setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        burgerRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close();
    };
    const desktop = window.matchMedia("(min-width: 960px)");
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", close);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", close);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 bg-ink py-3 shadow-[0_1px_0_var(--color-line-dark)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-7 text-white">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[30px] font-bold tracking-[0.01em] whitespace-nowrap text-foam max-[960px]:text-[clamp(16px,calc(10.5vw_-_17.7px),30px)]"
        >
          <RippleMark />
          Bergen Stupeklubb
        </Link>
        <div className="flex items-center gap-5.5 max-[960px]:hidden">
          <nav className="flex items-center gap-7.5">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`text-[14.5px] font-medium transition-colors duration-150 hover:text-aqua ${
                  isActive(l.href) ? "text-aqua" : "text-foam/82"
                }`}
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
        {/* Mobile: one-flag language toggle and the burger on the brand's line */}
        <div className="hidden shrink-0 items-center gap-1 max-[960px]:flex">
          <LanguageSwitcher compact />
          <button
            ref={burgerRef}
            className="cursor-pointer p-1 text-foam"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        aria-label={t("menu")}
        className={`wrap hidden flex-col gap-0.5 pt-2.5 pb-1 ${
          menuOpen ? "max-[960px]:flex" : ""
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
            {t(l.key)}
          </Link>
        ))}
        <Link
          href="/pamelding"
          onClick={() => setMenuOpen(false)}
          className="border-b border-line-dark px-1 py-3 text-[15px] text-foam"
        >
          {t("registration")}
        </Link>
      </nav>
    </header>
  );
}
