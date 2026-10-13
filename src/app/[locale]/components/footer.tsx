import { Mail, Phone, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { NAV_LINKS } from "../data/club";
export function InstagramIcon({ size = 19 }: { size?: number }) {
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

export function FacebookIcon({ size = 19 }: { size?: number }) {
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
const FOOTER_LINKS = [
  { key: "home", href: "/" },
  ...NAV_LINKS,
  { key: "divingSchool", href: "/stupskolen" },
  { key: "registration", href: "/pamelding" },
] as const;

const socialLinkStyles =
  "flex size-10.5 items-center justify-center rounded-full border border-line-dark text-foam transition-colors duration-150 hover:border-aqua hover:text-aqua";

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="mt-0.5 shrink-0 text-aqua">{icon}</span>
      <div className="text-[15px] text-foam/85">
        <strong className="mb-0.75 block text-[13px] font-semibold text-foam">
          {label}
        </strong>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  return (
    <section className="flex-1 bg-ink pt-24" id="kontakt">
      <div className="wrap">
        <div className="grid grid-cols-[1.2fr_1fr] gap-15 border-b border-line-dark pb-20 max-[900px]:grid-cols-1 max-[900px]:gap-11">
          <div>
            <h2 className="max-w-[12ch] text-[clamp(28px,3.4vw,38px)] text-foam">
              {t("title")}
            </h2>
            <p className="mt-4.5 max-w-[44ch] text-base text-foam/70">
              {t("text")}
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
                aria-label={t("email")}
                className={socialLinkStyles}
              >
                <Mail size={19} />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <ContactItem icon={<Mail size={19} />} label={t("email")}>
              <a href="mailto:hovedtrener@bergen-stupeklubb.no">
                hovedtrener@bergen-stupeklubb.no
              </a>
            </ContactItem>
            <ContactItem icon={<Phone size={19} />} label={t("phone")}>
              <a href="tel:+4793299995">(+47) 932 99 995</a>
            </ContactItem>
            <ContactItem icon={<MapPin size={19} />} label={t("address")}>
              <span>ADO Arena, Lungegårdskaien 40, 5015 Bergen</span>
            </ContactItem>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-9">
          {/* Mobile: two rows of four, each justified edge to edge; the font
              shrinks only where a row would not fit. Desktop: one row. */}
          <div className="flex flex-wrap gap-5 max-[720px]:w-full max-[720px]:flex-col max-[720px]:gap-3">
            {[FOOTER_LINKS.slice(0, 4), FOOTER_LINKS.slice(4)].map((row, i) => (
              <div key={i} className="flex gap-5 max-[720px]:justify-between max-[720px]:gap-2">
                {row.map((l) => (
                  <Link
                    key={l.key}
                    href={l.href}
                    className="text-[13.5px] whitespace-nowrap text-foam/55 hover:text-aqua max-[720px]:text-[clamp(10.5px,calc(4.38vw_-_3.5px),13.5px)]"
                  >
                    {tNav(l.key)}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
