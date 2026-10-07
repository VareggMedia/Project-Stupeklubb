import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import PageHeader from "../components/PageHeader";
import Sponsors from "../components/Sponsors";
import { TESTIMONIALS } from "../data/club";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/om-klubben">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "AboutPage" });
  return { title: t("title"), description: t("description") };
}

// TODO: Replace the [BRACKETED] placeholders in messages/*.json with the club's real info.
const ABOUT = ["club", "coaches", "board"] as const;

export default function OmKlubben() {
  const t = useTranslations("AboutPage");
  const tQuotes = useTranslations("Testimonials");
  const tCommon = useTranslations("Common");
  return (
    <>
      <PageHeader title={t("title")} crumb={t("title")} tone="pool" />

      <div className="wrap py-20 max-[900px]:py-14">
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {ABOUT.map((key) => (
            <section key={key} className="rounded-[20px] bg-foam-dim p-9">
              <h2 className="text-[26px]">{t(`cards.${key}.title`)}</h2>
              <p className="mt-3 text-base text-muted">{t(`cards.${key}.text`)}</p>
            </section>
          ))}
        </div>

        <h2 className="mt-20 mb-7 text-[clamp(26px,3vw,34px)]">
          {t("testimonialsTitle")}
        </h2>
        <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          {TESTIMONIALS.map((q) => (
            <figure
              key={q.key}
              className="rounded-[20px] border border-line-light bg-white p-8"
            >
              <blockquote className="font-display text-xl leading-snug">
                «{tQuotes(q.key)}»
              </blockquote>
              <figcaption className="mt-4 text-[15px] text-muted">
                {q.name}, {tCommon("age", { age: q.age })}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Sponsors />
    </>
  );
}
