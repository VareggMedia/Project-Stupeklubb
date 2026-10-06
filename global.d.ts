import { routing } from "@/src/i18n/routing";
import messages from "./messages/nb.json";

// Norwegian is the source of truth: keys missing here are type errors
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
