import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { type Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import { client, REVALIDATE_SECONDS } from "@/sanity/lib/client";
import { NYHETER_QUERY } from "@/sanity/lib/queries";
import PageHeader from "../components/PageHeader";
import NyhetKarusell from "../components/Nyheter/NyhetKarusell";
import NyhetKort from "../components/Nyheter/NyhetKort";
import SanityBilde from "../components/Nyheter/SanityBilde";
import { formatDato, utdrag } from "../components/Nyheter/format";

export const revalidate = 60; // seconds – keep in sync with REVALIDATE_SECONDS

export async function generateMetadata({ params }: PageProps<"/[locale]/nyheter">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "NewsList" });
  return { title: t("title") };
}

export default async function Nyheter({ params }: PageProps<"/[locale]/nyheter">) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "NewsList" });
  // Articles are Norwegian only for now (Kristoffer, #42); /en shows the same list
  const nyheter = await client.fetch(NYHETER_QUERY, {}, { next: { revalidate: REVALIDATE_SECONDS } });
  const [siste, ...resten] = nyheter;

  return (
    <>
      <PageHeader title={t("title")} crumb={t("title")} tone="pool" />

      <div className="wrap py-16 max-[900px]:py-12">
        {!siste && <p className="text-[17px] text-muted">{t("empty")}</p>}

        {siste && (
          <section aria-labelledby="siste-nytt">
            <h2 id="siste-nytt" className="sr-only">
              {t("latest")}
            </h2>
            <article className="group relative grid grid-cols-[1.15fr_1fr] items-center gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-6">
              <SanityBilde
                bilde={siste.hovedbilde}
                width={1200}
                height={800}
                sizes="(max-width: 900px) 100vw, 600px"
                className="aspect-[3/2] w-full rounded-3xl object-cover"
                priority
              />
              <div className="flex flex-col gap-4">
                <span className="text-[14px] font-semibold text-pool">{t("latest")}</span>
                <time dateTime={siste.dato ?? undefined} className="text-[14px] font-semibold text-muted">
                  {formatDato(siste.dato, locale)}
                </time>
                <h3 className="text-[clamp(28px,3.4vw,40px)] leading-[1.08]">
                  <Link href={`/nyheter/${siste.slug}`} className="after:absolute after:inset-0 group-hover:underline">
                    {siste.tittel}
                  </Link>
                </h3>
                <p className="text-[17px] text-muted">{utdrag(siste.ingress, siste.utdrag, 240)}</p>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-pool">
                  {t("readMore")}
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </article>
          </section>
        )}

        {resten.length > 0 && (
          <section aria-labelledby="flere-nyheter" className="mt-20 max-[900px]:mt-14">
            <h2 id="flere-nyheter" className="mb-6 text-[clamp(24px,3vw,32px)]">
              {t("more")}
            </h2>
            {resten.length === 1 ? (
              <div className="max-w-[422px]">
                <NyhetKort nyhet={resten[0]} locale={locale} />
              </div>
            ) : (
              <NyhetKarusell
                kort={resten.map((n) => <NyhetKort key={n._id} nyhet={n} locale={locale} />)}
                kloner={resten.map((n) => <NyhetKort key={n._id} nyhet={n} locale={locale} skjult />)}
                labels={{ region: t("carousel"), previous: t("previous"), next: t("next") }}
              />
            )}
          </section>
        )}
      </div>
    </>
  );
}
