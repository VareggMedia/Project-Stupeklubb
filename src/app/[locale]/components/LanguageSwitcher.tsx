"use client";

import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/src/i18n/navigation";

function NorwegianFlag() {
  return (
    <svg viewBox="0 0 22 16" aria-hidden="true" className="block h-4 w-5.5">
      <rect width="22" height="16" rx="1" fill="#BA0C2F" />
      <path d="M0 6h22v4H0zM6 0h4v16H6z" fill="#fff" />
      <path d="M0 7h22v2H0zM7 0h2v16H7z" fill="#00205B" />
    </svg>
  );
}

function BritishFlag() {
  return (
    <svg viewBox="0 0 22 16" aria-hidden="true" className="block h-4 w-5.5">
      <rect width="22" height="16" rx="1" fill="#012169" />
      <path d="m0 0 22 16m0-16L0 16" stroke="#fff" strokeWidth="4" />
      <path d="m0 0 22 16m0-16L0 16" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M11 0v16M0 8h22" stroke="#fff" strokeWidth="5" />
      <path d="M11 0v16M0 8h22" stroke="#C8102E" strokeWidth="2.5" />
    </svg>
  );
}

// Each language is named in its own language, so these are not translated.
const LANGUAGES = [
  { locale: "nb", name: "Norsk bokmål", switchTo: "Bytt til norsk", Flag: NorwegianFlag },
  { locale: "en", name: "English", switchTo: "Switch to English", Flag: BritishFlag },
] as const;

const optionStyles =
  "inline-flex items-center justify-center transition-opacity duration-150 ease-out";

// compact = mobile: one flag, the language you switch to
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("LanguageSwitcher");
  const currentLocale = useLocale();
  // Path without the locale prefix, e.g. "/om-klubben" on both "/om-klubben" and "/en/om-klubben"
  const pathname = usePathname();

  if (compact) {
    const target = LANGUAGES.find((l) => l.locale !== currentLocale)!;
    return (
      <NextLink
        href={getPathname({ locale: target.locale, href: pathname })}
        hrefLang={target.locale}
        lang={target.locale}
        aria-label={target.switchTo}
        title={target.switchTo}
        className={`${optionStyles} min-h-7 opacity-90 hover:opacity-100`}
      >
        <target.Flag />
      </NextLink>
    );
  }

  return (
    <div
      className="inline-flex min-h-7 items-center gap-2.5"
      role="group"
      aria-label={t("label")}
    >
      {LANGUAGES.map(({ locale, name, Flag }) => {
        const isActive = locale === currentLocale;
        return (
          // getPathname keeps "as-needed" (no /nb prefix); next-intl's Link with a
          // locale prop would always force the prefix and cost a redirect.
          <NextLink
            key={locale}
            href={getPathname({ locale, href: pathname })}
            hrefLang={locale}
            lang={locale}
            title={name}
            aria-current={isActive ? "true" : undefined}
            className={`${optionStyles} ${isActive ? "opacity-100" : "opacity-20 hover:opacity-60"}`}
          >
            <Flag />
            <span className="sr-only">{name}</span>
          </NextLink>
        );
      })}
    </div>
  );
}
