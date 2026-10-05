import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nb", "en"],
  defaultLocale: "nb",
  // Norwegian stays on "/", English gets "/en/…"
  localePrefix: "as-needed",
  // The URL decides the language; never redirect by browser Accept-Language
  localeDetection: false,
  // No locale cookie: nothing to remember, and links to Norwegian stay prefix-free
  localeCookie: false,
});
