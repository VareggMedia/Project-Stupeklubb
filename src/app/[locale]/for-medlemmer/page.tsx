import { Link } from "@/src/i18n/navigation";
import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, CircleAlert } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { DOORS } from "../data/club";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/for-medlemmer">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "MembersPage" });
  return { title: t("title"), description: t("description") };
}

// Texts: "MembersPage.*" in messages/{locale}.json.
// TODO: Replace the [BRACKETED] placeholders there with the club's real info.
// Set to false when there are no changes this week.
const SHOW_NOTICE = true;

const DAYS = ["mon", "tue", "wed", "thu", "friSun"] as const;

// true = a training slot ("[TID]"), false = no training ("–")
const SCHEDULE = [
  { group: "a", times: [true, false, true, false, false] },
  { group: "b", times: [false, true, false, true, false] },
  { group: "competition", times: [true, true, true, true, true] },
] as const;

const EVENTS = ["first", "second", "third"] as const;

const RESULTS = [
  { key: "latest", href: "#" },
  { key: "earlier", href: "#" },
  { key: "earlier", href: "#" },
] as const;

const PRACTICAL = [
  { key: "fee" },
  { key: "gear", href: "/klubbutstyr" },
  { key: "volunteer" },
] as const;

export default function ForMedlemmer() {
  const t = useTranslations("MembersPage");
  const tDoors = useTranslations("Doors.members.links");
  return (
    <>
      <PageHeader title={t("title")} crumb={t("title")} tone="pool">
        <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {DOORS.members.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex flex-col gap-1.5 rounded-2xl bg-foam p-6 text-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              <span className="font-display text-[22px] font-bold">
                {tDoors(l.key)}
              </span>
              <span className="text-sm text-muted">{t(`hints.${l.key}`)}</span>
            </Link>
          ))}
        </div>
      </PageHeader>

      <div className="wrap flex flex-col gap-16 py-16 max-[900px]:gap-12 max-[900px]:py-12">
        {SHOW_NOTICE && (
          <div
            role="status"
            className="flex items-center gap-3.5 rounded-2xl border border-[#e0c46c] bg-[#fff4d6] px-6 py-4.5 text-base"
          >
            <CircleAlert size={22} className="shrink-0" />
            <p>
              <strong>{t("noticeLabel")}</strong> {t("notice")}
            </p>
          </div>
        )}

        <section id="treningstider" className="scroll-mt-24">
          <h2 className="mb-5.5 text-[clamp(28px,3.4vw,34px)]">
            {t("scheduleTitle")}
          </h2>
          <div className="overflow-x-auto rounded-[18px] border border-line-light bg-white">
            <table className="w-full min-w-150 text-left text-[15px]">
              <thead className="bg-foam-dim text-sm">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">{t("group")}</th>
                  {DAYS.map((d) => (
                    <th key={d} className="px-5 py-3.5 font-semibold">
                      {t(`days.${d}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row) => (
                  <tr key={row.group} className="border-t border-line-light">
                    <th className="px-5 py-4 font-semibold">{t(`groups.${row.group}`)}</th>
                    {row.times.map((hasTraining, i) => (
                      <td key={i} className="px-5 py-4">
                        {hasTraining ? t("time") : "–"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          <section
            id="stevner"
            className="scroll-mt-24 rounded-[18px] border border-line-light bg-white px-8 py-7.5"
          >
            <h2 className="mb-3 text-[28px]">{t("eventsTitle")}</h2>
            <ul>
              {EVENTS.map((key) => (
                <li
                  key={key}
                  className="flex gap-4.5 border-b border-line-light py-3.5 text-[15px] last:border-b-0"
                >
                  <span className="w-16 shrink-0 font-semibold">{t("date")}</span>
                  {t(`events.${key}`)}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="resultater"
            className="scroll-mt-24 rounded-[18px] border border-line-light bg-white px-8 py-7.5"
          >
            <h2 className="mb-3 text-[28px]">{t("resultsTitle")}</h2>
            <ul>
              {RESULTS.map((r, i) => (
                <li
                  key={i}
                  className="flex justify-between gap-4 border-b border-line-light py-3.5 text-[15px] last:border-b-0"
                >
                  {t(`results.${r.key}`)}
                  <a
                    href={r.href}
                    className="shrink-0 font-semibold text-pool hover:underline"
                  >
                    {t("seeResults")}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section id="praktisk" className="scroll-mt-24">
          <h2 className="mb-5.5 text-[clamp(28px,3.4vw,34px)]">
            {t("practicalTitle")}
          </h2>
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
            {PRACTICAL.map((p) => (
              <div
                key={p.key}
                className="flex flex-col gap-2 rounded-2xl bg-foam-dim p-6.5"
              >
                <h3 className="font-sans text-[19px] font-semibold">
                  {t(`practical.${p.key}.title`)}
                </h3>
                <p className="text-[15px] text-muted">{t(`practical.${p.key}.text`)}</p>
                {"href" in p && (
                  <Link
                    href={p.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[15px] font-semibold text-pool hover:underline"
                  >
                    {t("goToGear")}
                    <ArrowUpRight size={16} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
