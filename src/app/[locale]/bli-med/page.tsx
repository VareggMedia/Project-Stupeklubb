import { Link } from "@/src/i18n/navigation";
import type { Metadata } from "next";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { ArrowUpRight, Check, MapPin, SquareParking } from "lucide-react";
import { buttonStyles } from "../components/button";
import PageHeader from "../components/PageHeader";
import SmoothScrollLink from "../components/SmoothScrollLink";
import { TESTIMONIALS } from "../data/club";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/bli-med">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "JoinPage",
  });
  return { title: t("metaTitle"), description: t("description") };
}

// Texts: "JoinPage.*" in messages/{locale}.json.
// TODO: Replace the [BRACKETED] placeholders there with the club's real info.
// Each quick fact links to the section further down that explains it.
const QUICK_FACTS = [
  { key: "age", target: "kurs" },
  { key: "price", target: "priser" },
  { key: "where", target: "finn-fram" },
  { key: "skills", target: "forste-gang" },
] as const;

const COURSES = [
  { key: "children", cta: "signUp", href: "/pamelding" },
  { key: "youth", cta: "signUp", href: "/pamelding" },
  { key: "adults", cta: "signUp", href: "/pamelding" },
  { key: "adapted", cta: "contactUs", href: "/kontakt" },
] as const;

const PRICES = ["children", "youth", "adults", "membership"] as const;

const BRING = ["swimwear", "towel", "bottle"] as const;

const FIRST_TIME = ["arrive", "coach", "session", "after"] as const;

const ARENA_QUERY = encodeURIComponent(
  "ADO Arena, Lungegårdskaien 40, 5015 Bergen",
);
const PARKING_QUERY = encodeURIComponent(
  "Bygarasjen, Vestre Strømkaien 3, 5008 Bergen",
);

const QUOTE = TESTIMONIALS.find((q) => q.key === "synne")!;

export default function BliMed() {
  const t = useTranslations("JoinPage");
  const tQuotes = useTranslations("Testimonials");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  return (
    <>
      <PageHeader title={t("title")} crumb={t("crumb")} tone="aqua">
        <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {QUICK_FACTS.map(({ key, target }) => (
            <SmoothScrollLink
              key={key}
              targetId={target}
              className="flex flex-col rounded bg-foam p-3 text-ink shadow-2xl transition-transform duration-150 hover:-translate-y-0.5 hover:bg-light_coral"
            >
              <span className="font-display text-[22px] font-bold">
                {t(`facts.${key}.label`)}
              </span>
            </SmoothScrollLink>
          ))}
        </div>
      </PageHeader>

      <div className="wrap flex flex-col gap-20 py-20 max-[900px]:gap-14 max-[900px]:py-14">
        <div className="bg-board p-3 rounded-20">
          <Step id="kurs" number="01" title={t("coursesTitle")}>
            <div className=" grid grid-cols-4 gap-5 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
              {COURSES.map((c) => (
                <div
                  key={c.key}
                  className="flex flex-col gap-2.5 rounded border border-line-light bg-white p-6.5"
                >
                  <span className="text-[13px] font-semibold text-muted">
                    {t(`courses.${c.key}.age`)}
                  </span>
                  <h3 className="text-[23px]">{t(`courses.${c.key}.title`)}</h3>
                  <p className="text-[15px] text-muted">
                    {t(`courses.${c.key}.text`)}
                  </p>
                  <Link
                    href={c.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[15px] font-semibold text-pool hover:underline"
                  >
                    {t(c.cta)}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
            <Link
              href="/stupskolen"
              className={`${buttonStyles.ghostLight} mt-6`}
            >
              {t("readMoreSchool")}
              <ArrowUpRight size={16} />
            </Link>
          </Step>
        </div>
        <div className="bg-board p-3 rounded-20">
          <Step id="priser" number="02" title={t("pricesTitle")}>
            <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
              <dl className="rounded border border-line-light bg-white px-8 py-4">
                {PRICES.map((key) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-line-light py-3.5 text-base last:border-b-0"
                  >
                    <dt>{t(`prices.${key}.label`)}</dt>
                    <dd className="font-semibold">
                      {t(`prices.${key}.price`)}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="rounded bg-foam-dim px-8 py-7">
                <h3 className="font-sans text-lg font-semibold">
                  {t("bringTitle")}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {BRING.map((key) => (
                    <li key={key} className="flex items-center gap-2.5">
                      <Check size={18} className="text-aqua-deep" />
                      {t(`bring.${key}`)}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[15px] text-muted">{t("bringNote")}</p>
              </div>
            </div>
          </Step>
        </div>
        <div className="bg-board p-3 rounded-20">
          <Step id="finn-fram" number="03" title={t("findUsTitle")}>
            <div className="grid grid-cols-[1fr_2fr] gap-6 max-[900px]:grid-cols-1">
              <div className="flex flex-col gap-5 rounded border border-line-light bg-white px-8 py-7">
                <div className="flex gap-3">
                  <MapPin
                    size={19}
                    className="mt-0.5 shrink-0 text-aqua-deep"
                  />
                  <div>
                    <h3 className="font-sans text-base font-semibold">
                      {t("findUs.arena")}
                    </h3>
                    <address className="text-[15px] text-muted not-italic">
                      Lungegårdskaien 40
                      <br />
                      5015 Bergen
                    </address>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${ARENA_QUERY}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block text-[15px] font-semibold text-pool hover:underline"
                    >
                      {t("findUs.directions")}
                      <span className="sr-only">
                        {" "}
                        {t("findUs.toArena")}
                      </span>{" "}
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only"> {tCommon("newTab")}</span>
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <SquareParking
                    size={19}
                    className="mt-0.5 shrink-0 text-aqua-deep"
                  />
                  <div>
                    <h3 className="font-sans text-base font-semibold">
                      {t("findUs.parking")}
                    </h3>
                    <address className="text-[15px] text-muted not-italic">
                      Bygarasjen, Vestre Strømkaien 3
                      <br />
                      {t("findUs.walk")}
                    </address>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${PARKING_QUERY}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block text-[15px] font-semibold text-pool hover:underline"
                    >
                      {t("findUs.directions")}
                      <span className="sr-only">
                        {" "}
                        {t("findUs.toParking")}
                      </span>{" "}
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only"> {tCommon("newTab")}</span>
                    </a>
                  </div>
                </div>
              </div>
              <iframe
                title={t("findUs.mapTitle")}
                src={`https://www.google.com/maps?q=${ARENA_QUERY}&hl=${locale}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full rounded border-0 max-[900px]:h-64"
              />
            </div>
          </Step>
        </div>
        <div className="bg-board p-3 rounded-20">
          <Step id="forste-gang" number="04" title={t("firstTimeTitle")}>
            <ol className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 ">
              {FIRST_TIME.map((key) => (
                <li
                  key={key}
                  className="flex flex-col gap-2.5 border-t-3 border-aqua pt-5"
                >
                  <h3 className="text-[21px]">{t(`firstTime.${key}.title`)}</h3>
                  <p className="text-[15px] text-muted">
                    {t(`firstTime.${key}.text`)}
                  </p>
                </li>
              ))}
            </ol>
          </Step>
        </div>
        {/* <figure className="flex items-center gap-8 rounded-[20px] border border-line-light bg-white px-11 py-9 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4 max-[900px]:px-7">
          <blockquote className="flex-1 font-display text-[clamp(20px,2.4vw,26px)] leading-snug">
            «{tQuotes(QUOTE.key)}»
          </blockquote>
          <figcaption className="shrink-0 text-[15px] text-muted">
            {QUOTE.name}, {tCommon("age", { age: QUOTE.age })}
          </figcaption>
        </figure> */}

        <section
          id="pamelding"
          className="flex scroll-mt-24 items-center justify-between gap-10 rounded-20 bg-ink p-14 text-foam max-[900px]:flex-col max-[900px]:items-start max-[900px]:p-8"
        >
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-xl font-bold text-aqua">
                05
              </span>
              <h2 className="text-[clamp(28px,3.4vw,40px)]">
                {t("readyTitle")}
              </h2>
            </div>
            <p className="mt-3 max-w-[50ch] text-[17px] text-foam/80">
              {t("readyText")}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3.5">
            <Link href="/pamelding" className={buttonStyles.primary}>
              {t("goToRegistration")}
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/kontakt" className={buttonStyles.ghostDark}>
              {t("askUs")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function Step({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-7 flex items-baseline gap-4">
        <span className="font-display text-xl font-bold text-aqua-deep">
          {number}
        </span>
        <h2 className="text-[clamp(28px,3.4vw,36px)]">{title}</h2>
      </div>
      {children}
    </section>
  );
}
