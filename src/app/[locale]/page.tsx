import { Link } from "@/src/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import WaveDivider from "./components/WaveDivider";
import Sponsors from "./components/Sponsors";
import { DOORS } from "./data/club";

/**
 * BERGEN STUPEKLUBB — redesigned landing page
 * Rebuilt from bergenstupeklubb.no with an original aquatic visual identity.
 */

const HERO_STATS = ["ages", "venue", "safe"] as const;

export default function App() {
  const t = useTranslations("HomePage");
  const tDoors = useTranslations("Doors");
  const tNav = useTranslations("Nav");
  return (
    <div>
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-[radial-gradient(120%_10%_at_6%_1%,rgba(73,214,198,0.55)_50%,rgba(13,107,126,0.65)_60%,rgba(8,33,41,0.33)_20%),url('/images/hero-diver.avif')] bg-cover bg-center max-[900px]:bg-[length:auto_110%] max-[900px]:bg-[position:72%_100%] pt-35 pb-36 max-[900px]:pb-28"
        id="om-oss"
      >
        <div className="wrap grid grid-cols-[1.05fr_0.95fr] items-center gap-10 pb-17.5 max-[900px]:grid-cols-1">
          <div>
            <span className="mb-5.5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-aqua">
              <span className="size-1.5 rounded-full bg-aqua" />
              {t("eyebrow")}
            </span>
            <h1 className="max-w-[12ch] text-[clamp(38px,5.4vw,60px)] leading-[1.04] text-foam">
              {t("title")}
            </h1>
            <p className="mt-5.5 max-w-[42ch] text-[18px] text-foam/78">
              {t("lead")}
            </p>
            <div className="mt-13.5 flex gap-7.5 border-t border-line-dark pt-6.5 max-[900px]:flex-wrap max-[900px]:gap-y-5">
              {HERO_STATS.map((key) => (
                <div
                  key={key}
                  className="max-w-[16ch] text-[13.5px] text-foam/95"
                >
                  <strong className="mb-0.75 block font-display text-[15px] text-foam">
                    {t(`stats.${key}.title`)}
                  </strong>
                  {t(`stats.${key}.text`)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <WaveDivider color="var(--color-foam)" />
        </div>
      </section>

      {/* DOORS — guide new and existing members to their own page */}
      <section className="relative z-10 -mt-44 max-[900px]:-mt-16">
        <div className="wrap grid grid-cols-2 gap-7 max-[900px]:grid-cols-1 max-[900px]:gap-4">
          <Door
            href={DOORS.new.href}
            label={tNav(DOORS.new.key)}
            eyebrow={tDoors("join.eyebrow")}
            links={DOORS.new.links.map((l) => ({
              href: l.href,
              label: tDoors(`join.links.${l.key}`),
            }))}
            text={t("doorJoinText")}
            tone="aqua"
          />
          <Door
            href={DOORS.members.href}
            label={tNav(DOORS.members.key)}
            eyebrow={tDoors("members.eyebrow")}
            links={DOORS.members.links.map((l) => ({
              href: l.href,
              label: tDoors(`members.links.${l.key}`),
            }))}
            text={t("doorMembersText")}
            tone="pool"
          />
        </div>
      </section>

      {/* INCLUSIVITY */}
      <section className="bg-foam pt-22.5 pb-16 text-center">
        <div className="mx-auto max-w-160 px-7">
          <h2 className="text-[clamp(24px,3vw,30px)]">
            {t("inclusiveTitle")}
          </h2>
          <p className="mt-4 text-[16.5px] text-muted">
            {t("inclusiveText")}
          </p>
        </div>
      </section>

      {/* NEWS, ABOUT, CONTACT — shared by both doors */}
      <section className="bg-foam pb-22.5">
        <div className="wrap grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          <SharedCard
            href="/nyheter"
            title={t("cards.news.title")}
            text={t("cards.news.text")}
            cta={t("cards.news.cta")}
          />
          <SharedCard
            href="/om-klubben"
            title={t("cards.about.title")}
            text={t("cards.about.text")}
            cta={t("cards.about.cta")}
          />
          <SharedCard
            href="/kontakt"
            title={t("cards.contact.title")}
            text={t("cards.contact.text")}
            cta={t("cards.contact.cta")}
          />
        </div>
      </section>

      <Sponsors />
      <WaveDivider flip={false} color="var(--color-ink)" />

      {/* CONTACT */}
    </div>
  );
}

function Door({
  href,
  label,
  eyebrow,
  links,
  text,
  tone,
}: {
  href: string;
  label: string;
  eyebrow: string;
  links: { href: string; label: string }[];
  text: string;
  tone: "aqua" | "pool";
}) {
  const isAqua = tone === "aqua";
  return (
    <div
      className={`group relative flex flex-col gap-4.5 rounded-3xl p-11 shadow-[0_20px_40px_rgba(8,33,41,0.18)] transition-transform duration-150 hover:-translate-y-1 max-[900px]:p-7 ${
        isAqua
          ? "bg-aqua text-ink hover:bg-emerald-300"
          : "bg-pool text-foam hover:bg-emerald-700"
      }`}
    >
      <span
        className={`text-[15px] font-semibold ${isAqua ? "" : "text-aqua"}`}
      >
        {eyebrow}
      </span>
      <h2 className="text-[clamp(34px,4vw,48px)] leading-none">
        {/* Stretched link: the ::after overlay makes the whole card clickable */}
        <Link
          href={href}
          className="inline-flex items-center gap-2 after:absolute after:inset-0 after:rounded-3xl after:content-['']"
        >
          {label}
          <ArrowUpRight
            size={32}
            className="transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </h2>
      <p className="max-w-[40ch] text-[17px]">{text}</p>
      <div className="mt-1 grid grid-cols-2 gap-2.5 max-[480px]:grid-cols-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`relative z-10 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors duration-150 ${
              isAqua
                ? "bg-white/45 hover:bg-white/70"
                : "border border-line-dark bg-white/8 hover:border-aqua"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SharedCard({
  href,
  title,
  text,
  cta,
}: {
  href: string;
  title: string;
  text: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-[20px] bg-foam-dim p-9 transition-colors duration-150 hover:bg-[#d9e8e5]"
    >
      <h3 className="text-[26px]">{title}</h3>
      <p className="text-base text-muted">{text}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-[15px] font-semibold text-pool group-hover:underline">
        {cta}
        <ArrowUpRight size={16} />
      </span>
    </Link>
  );
}
