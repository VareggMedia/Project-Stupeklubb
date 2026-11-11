import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Mail, Phone, MapPin, SquareParking } from "lucide-react";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import PageHeader from "../components/PageHeader";
import SmoothScrollLink from "../components/SmoothScrollLink";
import { buttonStyles } from "../components/button";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/kontakt">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "ContactPage",
  });
  return { title: t("metaTitle") };
}

function ContactLine({
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
      <span className="mt-0.5 shrink-0 text-pool">{icon}</span>
      <div className="text-base">
        <strong className="mb-0.5 block text-[13px] font-semibold text-muted">
          {label}
        </strong>
        {children}
      </div>
    </div>
  );
}

const MAP_QUERY = encodeURIComponent(
  "ADO Arena, Lungegårdskaien 40, 5015 Bergen",
);

const PARKING_QUERY = encodeURIComponent(
  "Bygarasjen, Vestre Strømkaien 3, 5008 Bergen",
);

export default function Kontakt() {
  const t = useTranslations("ContactPage");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  return (
    <>
      <PageHeader title={t("title")} crumb={t("crumb")} tone="aqua">
        <div className="flex items-end justify-between gap-x-10 gap-y-6 max-[900px]:flex-col max-[900px]:items-start">
          <p className="max-w-[50ch] text-[17px] text-pool">{t("text")}</p>
          <SmoothScrollLink
            targetId="mitt-varsel"
            className={`${buttonStyles.base} shrink-0 bg-pool text-foam hover:bg-ink`}
          >
            {t("whistleblowing.jump")} <span aria-hidden="true">↓</span>
          </SmoothScrollLink>
        </div>
      </PageHeader>

      <div className="wrap py-20 max-[900px]:py-14">
        <div className="grid grid-cols-[1fr_1fr] gap-6 max-[900px]:grid-cols-1">
          <section className="flex gap-8 rounded-[20px] bg-foam-dim p-9 max-[600px]:flex-col max-[600px]:gap-6">
            {/* TODO: Replace with the photo of Paul Joachim (PJ1.jpg) once it is in public/images. */}
            <div
              aria-hidden
              className="flex size-32 shrink-0 items-center justify-center rounded-full bg-aqua font-display text-[40px] text-ink"
            >
              PJ
            </div>
            <div>
              <h2 className="text-[26px]">Paul Joachim Bloch Thorsen</h2>
              <p className="mt-1 text-[15px] font-semibold text-pool">
                {t("coach.role")}
              </p>
              <p className="mt-4 max-w-[60ch] text-base text-muted">
                {t("coach.text")}
              </p>
              <div className="mt-6 flex flex-col gap-4">
                <ContactLine icon={<Mail size={19} />} label={t("email")}>
                  <a
                    href="mailto:hovedtrener@bergen-stupeklubb.no"
                    className="hover:underline"
                  >
                    hovedtrener@bergen-stupeklubb.no
                  </a>
                </ContactLine>
                <ContactLine icon={<Phone size={19} />} label={t("phone")}>
                  <a href="tel:+4793299995" className="hover:underline">
                    +47 932 99 995
                  </a>
                </ContactLine>
              </div>
            </div>
          </section>

          <section className="flex flex-col rounded-[20px] border border-line-light bg-white p-9">
            <h2 className="text-[26px]">{t("visit.title")}</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 max-[420px]:grid-cols-1">
              <ContactLine icon={<MapPin size={19} />} label={t("address")}>
                <address className="not-italic">
                  ADO Arena
                  <br />
                  Lungegårdskaien 40
                  <br />
                  5015 Bergen
                </address>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[15px] font-semibold text-pool hover:underline"
                >
                  {t("visit.directions")}
                  <span className="sr-only"> {t("visit.toArena")}</span>{" "}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> {tCommon("newTab")}</span>
                </a>
              </ContactLine>
              <ContactLine
                icon={<SquareParking size={19} />}
                label={t("visit.parking")}
              >
                <address className="not-italic">
                  Bygarasjen
                  <br />
                  Vestre Strømkaien 3
                  <br />
                  5008 Bergen
                </address>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${PARKING_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[15px] font-semibold text-pool hover:underline"
                >
                  {t("visit.directions")}
                  <span className="sr-only"> {t("visit.toParking")}</span>{" "}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> {tCommon("newTab")}</span>
                </a>
              </ContactLine>
            </div>
            {/* Walking route from the parking garage to the arena, so both are pinned */}
            <iframe
              title={t("visit.mapTitle")}
              src={`https://www.google.com/maps?saddr=${PARKING_QUERY}&daddr=${MAP_QUERY}&dirflg=w&hl=${locale}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 min-h-74 w-full flex-1 rounded-xl border-0"
            />
          </section>
        </div>

        <section
          id="mitt-varsel"
          className="mt-6 grid scroll-mt-28 grid-cols-[1.6fr_1fr] gap-10 rounded-[20px] bg-pool p-9 text-foam max-[900px]:grid-cols-1 max-[900px]:gap-8"
        >
          <div>
            <p className="text-[13px] font-semibold tracking-wide text-aqua uppercase">
              {t("whistleblowing.eyebrow")}
            </p>
            <h2 className="mt-2 text-[26px]">{t("whistleblowing.title")}</h2>
            <p className="mt-4 max-w-[60ch] text-base text-foam/85">
              {t("whistleblowing.text")}
            </p>
            <p className="mt-4 max-w-[60ch] text-base text-foam/85">
              {t("whistleblowing.why")}
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <a
              href="https://www.idrettsforbundet.no/tema/varsling/"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles.primary}
            >
              {t("whistleblowing.report")} <span aria-hidden="true">↗</span>
              <span className="sr-only"> {tCommon("newTab")}</span>
            </a>
            <a
              href="https://www.idrettsforbundet.no/tema/varsling/mer-om-tema/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-foam hover:text-aqua hover:underline"
            >
              {t("whistleblowing.topics")} <span aria-hidden="true">↗</span>
              <span className="sr-only"> {tCommon("newTab")}</span>
            </a>
            <a
              href="https://www.antidoping.no/kontroll/tips-oss-om-doping"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-foam hover:text-aqua hover:underline"
            >
              {t("whistleblowing.doping")} <span aria-hidden="true">↗</span>
              <span className="sr-only"> {tCommon("newTab")}</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
