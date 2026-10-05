import { Mail, Phone, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
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
  { label: "Hjem", href: "/" },
  ...NAV_LINKS,
  { label: "Stupskolen", href: "/stupskolen" },
  { label: "Påmelding", href: "/pamelding" },
];

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
  return (
    <section className="bg-ink pt-24" id="kontakt">
      <div className="wrap">
        <div className="grid grid-cols-[1.2fr_1fr] gap-15 border-b border-line-dark pb-20 max-[900px]:grid-cols-1 max-[900px]:gap-11">
          <div>
            <h2 className="max-w-[12ch] text-[clamp(28px,3.4vw,38px)] text-foam">
              Ta kontakt!
            </h2>
            <p className="mt-4.5 max-w-[44ch] text-base text-foam/70">
              For oss er det viktig at du føler deg velkommen. Har du spørsmål
              vi ikke har svart på her, vil vi at du skal ta kontakt fort som
              bare rakkeren. Vi digger spørsmål — vi er jo tross alt
              bergensere.
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
                aria-label="E-post"
                className={socialLinkStyles}
              >
                <Mail size={19} />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <ContactItem icon={<Mail size={19} />} label="E-post">
              <a href="mailto:hovedtrener@bergen-stupeklubb.no">
                hovedtrener@bergen-stupeklubb.no
              </a>
            </ContactItem>
            <ContactItem icon={<Phone size={19} />} label="Telefon">
              <a href="tel:+4793299995">(+47) 932 99 995</a>
            </ContactItem>
            <ContactItem icon={<MapPin size={19} />} label="Adresse">
              <span>ADO Arena, Lungegårdskaien 40, 5015 Bergen</span>
            </ContactItem>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-9">
          <div className="flex flex-wrap gap-5">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[13.5px] text-foam/55 hover:text-aqua"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="text-[13px] text-foam/40">
            Bergen Stupeklubb — ADO Arena, Lungegårdskaien 40, 5015 Bergen
          </div>
        </div>
      </div>
    </section>
  );
}
