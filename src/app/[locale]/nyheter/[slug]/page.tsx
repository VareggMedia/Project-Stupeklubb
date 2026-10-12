import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { type Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import { client, REVALIDATE_SECONDS } from "@/sanity/lib/client";
import { NYHET_QUERY, NYHET_SLUGS_QUERY } from "@/sanity/lib/queries";
import SanityBilde from "../../components/Nyheter/SanityBilde";
import { formatDato } from "../../components/Nyheter/format";

export const revalidate = 60; // seconds – keep in sync with REVALIDATE_SECONDS

// Published articles are built ahead; new slugs render on first visit, then stay cached
export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch(NYHET_SLUGS_QUERY);
  return slugs.flatMap((s) => (s.slug ? [{ slug: s.slug }] : []));
}

async function hentNyhet(slug: string) {
  return client.fetch(NYHET_QUERY, { slug }, { next: { revalidate: REVALIDATE_SECONDS } });
}

export async function generateMetadata({ params }: PageProps<"/[locale]/nyheter/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const nyhet = await hentNyhet(slug);
  if (!nyhet) return {};
  return { title: nyhet.tittel ?? undefined, description: nyhet.ingress ?? undefined };
}

const tekst: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-5 text-[17px] leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 text-[clamp(24px,3vw,30px)]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-[21px]">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px]">{children}</ul>,
    number: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[17px]">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      const extern = href.startsWith("http");
      return (
        <a
          href={href}
          className="font-semibold text-pool underline underline-offset-2"
          {...(extern ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function Nyhet({ params }: PageProps<"/[locale]/nyheter/[slug]">) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "NewsList" });
  const nyhet = await hentNyhet(slug);
  if (!nyhet) notFound();

  return (
    <article className="pt-28 pb-20 max-[900px]:pt-24 max-[900px]:pb-14">
      <div className="wrap">
        <Link href="/nyheter" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-pool hover:underline">
          <ArrowLeft size={16} />
          {t("back")}
        </Link>
        <SanityBilde
          bilde={nyhet.hovedbilde}
          width={1600}
          height={900}
          sizes="(max-width: 1120px) 100vw, 1064px"
          className="mt-6 aspect-[16/9] w-full rounded-3xl object-cover"
          priority
        />
        <div className="mx-auto mt-10 max-w-[68ch]">
          <time dateTime={nyhet.dato ?? undefined} className="text-[14px] font-semibold text-muted">
            {formatDato(nyhet.dato, locale)}
          </time>
          <h1 className="mt-3 text-[clamp(32px,4.4vw,52px)] leading-[1.06]">{nyhet.tittel}</h1>
          {nyhet.ingress && <p className="mt-5 text-[19px] font-medium text-muted">{nyhet.ingress}</p>}
          {nyhet.innhold && <PortableText value={nyhet.innhold} components={tekst} />}
        </div>

        {nyhet.bilder && nyhet.bilder.length > 0 && (
          <section aria-labelledby="bilder" className="mt-16">
            <h2 id="bilder" className="sr-only">
              {t("gallery")}
            </h2>
            <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
              {nyhet.bilder.map((bilde) => (
                <figure key={bilde._key}>
                  <SanityBilde
                    bilde={bilde}
                    width={800}
                    height={600}
                    sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 355px"
                    className="aspect-[4/3] w-full rounded-2xl object-cover"
                  />
                  {bilde.bildetekst && <figcaption className="mt-2 text-[14px] text-muted">{bilde.bildetekst}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
