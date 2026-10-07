import { Link } from "@/src/i18n/navigation";
import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { buttonStyles } from "../components/button";
import PageHeader from "../components/PageHeader";
import { TESTIMONIALS } from "../data/club";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/bli-med">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "JoinPage" });
  return { title: t("metaTitle"), description: t("description") };
}

// Texts: "JoinPage.*" in messages/{locale}.json.
// TODO: Replace the [BRACKETED] placeholders there with the club's real info.
const QUICK_FACTS = ["age", "price", "where", "skills"] as const;

const COURSES = [
  { key: "children", cta: "signUp", href: "/pamelding" },
  { key: "youth", cta: "signUp", href: "/pamelding" },
  { key: "adults", cta: "signUp", href: "/pamelding" },
  { key: "adapted", cta: "contactUs", href: "/kontakt" },
] as const;

const PRICES = ["children", "youth", "adults", "membership"] as const;

const BRING = ["swimwear", "towel", "bottle"] as const;

const FIRST_TIME = ["arrive", "coach", "session", "after"] as const;

const QUOTE = TESTIMONIALS.find((q) => q.key === "synne")!;

export default function BliMed() {
  const t = useTranslations("JoinPage");
  const tQuotes = useTranslations("Testimonials");
  const tCommon = useTranslations("Common");
  return (
    <>
      <PageHeader
        title={t("title")}
        crumb={t("crumb")}
        tone="aqua"
      >
        <dl className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {QUICK_FACTS.map((key) => (
            <div key={key} className="rounded-2xl bg-white/50 px-5 py-4.5">
              <dt className="text-[13px] font-semibold">{t(`facts.${key}.label`)}</dt>
              <dd className="mt-1 text-[19px] font-semibold">{t(`facts.${key}.value`)}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="wrap flex flex-col gap-20 py-20 max-[900px]:gap-14 max-[900px]:py-14">
        <Step id="kurs" number="01" title={t("coursesTitle")}>
          <div className="grid grid-cols-4 gap-5 max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
            {COURSES.map((c) => (
              <div
                key={c.key}
                className="flex flex-col gap-2.5 rounded-[18px] border border-line-light bg-white p-6.5"
              >
                <span className="text-[13px] font-semibold text-muted">
                  {t(`courses.${c.key}.age`)}
                </span>
                <h3 className="text-[23px]">{t(`courses.${c.key}.title`)}</h3>
                <p className="text-[15px] text-muted">{t(`courses.${c.key}.text`)}</p>
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

        <Step id="priser" number="02" title={t("pricesTitle")}>
          <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
            <dl className="rounded-[18px] border border-line-light bg-white px-8 py-4">
              {PRICES.map((key) => (
                <div
                  key={key}
                  className="flex justify-between border-b border-line-light py-3.5 text-base last:border-b-0"
                >
                  <dt>{t(`prices.${key}.label`)}</dt>
                  <dd className="font-semibold">{t(`prices.${key}.price`)}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-[18px] bg-foam-dim px-8 py-7">
              <h3 className="font-sans text-lg font-semibold">{t("bringTitle")}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {BRING.map((key) => (
                  <li key={key} className="flex items-center gap-2.5">
                    <Check size={18} className="text-aqua-deep" />
                    {t(`bring.${key}`)}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] text-muted">
                {t("bringNote")}
              </p>
            </div>
          </div>
        </Step>

        <Step id="forste-gang" number="03" title={t("firstTimeTitle")}>
          <ol className="grid grid-cols-4 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            {FIRST_TIME.map((key) => (
              <li
                key={key}
                className="flex flex-col gap-2.5 border-t-3 border-aqua pt-5"
              >
                <h3 className="text-[21px]">{t(`firstTime.${key}.title`)}</h3>
                <p className="text-[15px] text-muted">{t(`firstTime.${key}.text`)}</p>
              </li>
            ))}
          </ol>
        </Step>

        <figure className="flex items-center gap-8 rounded-[20px] border border-line-light bg-white px-11 py-9 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-4 max-[900px]:px-7">
          <blockquote className="flex-1 font-display text-[clamp(20px,2.4vw,26px)] leading-snug">
            «{tQuotes(QUOTE.key)}»
          </blockquote>
          <figcaption className="shrink-0 text-[15px] text-muted">
            {QUOTE.name}, {tCommon("age", { age: QUOTE.age })}
          </figcaption>
        </figure>

        <section
          id="pamelding"
          className="flex scroll-mt-24 items-center justify-between gap-10 rounded-3xl bg-ink p-14 text-foam max-[900px]:flex-col max-[900px]:items-start max-[900px]:p-8"
        >
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-xl font-bold text-aqua">
                04
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
