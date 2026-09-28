import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, CircleAlert } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { DOORS } from "../data/club";

export const metadata: Metadata = {
  title: "For medlemmer | Bergen Stupeklubb",
  description: "Treningstider, stevner, resultater og praktisk info.",
};

const TILE_HINTS: Record<string, string> = {
  Treningstider: "og endringer denne uken",
  "Stevner og kalender": "kommende stevner og frister",
  Resultater: "siste stevner",
  "Kontingent og praktisk": "betaling, utstyr og dugnad",
};

// TODO: Replace the [BRACKETED] placeholders with the club's real info.
// Set to null when there are no changes this week.
const NOTICE: string | null =
  "[F.eks. «Ingen trening torsdag [DATO], bassenget er stengt»]";

const DAYS = ["Man", "Tir", "Ons", "Tor", "Fre–søn"];

const SCHEDULE = [
  { group: "[Gruppe A]", times: ["[TID]", "–", "[TID]", "–", "–"] },
  { group: "[Gruppe B]", times: ["–", "[TID]", "–", "[TID]", "–"] },
  {
    group: "[Konkurranse]",
    times: ["[TID]", "[TID]", "[TID]", "[TID]", "[TID]"],
  },
];

const EVENTS = [
  { date: "[DATO]", text: "[Stevnenavn] · [Sted] · påmeldingsfrist [DATO]" },
  { date: "[DATO]", text: "[Stevnenavn] · [Sted]" },
  { date: "[DATO]", text: "[Sosialt / dugnad / ferie]" },
];

const RESULTS = [
  { name: "[Siste stevne], [DATO]", href: "#" },
  { name: "[Stevne], [DATO]", href: "#" },
  { name: "[Stevne], [DATO]", href: "#" },
];

const PRACTICAL = [
  {
    title: "Kontingent",
    text: "[Beløp, forfall og hvordan man betaler]",
  },
  {
    title: "Klubbutstyr",
    text: "Klubbtøy fra Craft: treningsjakker, hettegensere, t-skjorter og shorts.",
    href: "/klubbutstyr",
  },
  {
    title: "Dugnad og frivillig",
    text: "[Hva forventes av foreldre og medlemmer?]",
  },
];

export default function ForMedlemmer() {
  return (
    <>
      <PageHeader title="For medlemmer" crumb="For medlemmer" tone="pool">
        <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {DOORS.members.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex flex-col gap-1.5 rounded-2xl bg-foam p-6 text-ink transition-transform duration-150 hover:-translate-y-0.5"
            >
              <span className="font-display text-[22px] font-bold">
                {l.label}
              </span>
              <span className="text-sm text-muted">{TILE_HINTS[l.label]}</span>
            </Link>
          ))}
        </div>
      </PageHeader>

      <div className="wrap flex flex-col gap-16 py-16 max-[900px]:gap-12 max-[900px]:py-12">
        {NOTICE && (
          <div
            role="status"
            className="flex items-center gap-3.5 rounded-2xl border border-[#e0c46c] bg-[#fff4d6] px-6 py-4.5 text-base"
          >
            <CircleAlert size={22} className="shrink-0" />
            <p>
              <strong>Endring:</strong> {NOTICE}
            </p>
          </div>
        )}

        <section id="treningstider" className="scroll-mt-24">
          <h2 className="mb-5.5 text-[clamp(28px,3.4vw,34px)]">
            Treningstider
          </h2>
          <div className="overflow-x-auto rounded-[18px] border border-line-light bg-white">
            <table className="w-full min-w-150 text-left text-[15px]">
              <thead className="bg-foam-dim text-sm">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Gruppe</th>
                  {DAYS.map((d) => (
                    <th key={d} className="px-5 py-3.5 font-semibold">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row) => (
                  <tr key={row.group} className="border-t border-line-light">
                    <th className="px-5 py-4 font-semibold">{row.group}</th>
                    {row.times.map((t, i) => (
                      <td key={i} className="px-5 py-4">
                        {t}
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
            <h2 className="mb-3 text-[28px]">Stevner og kalender</h2>
            <ul>
              {EVENTS.map((e, i) => (
                <li
                  key={i}
                  className="flex gap-4.5 border-b border-line-light py-3.5 text-[15px] last:border-b-0"
                >
                  <span className="w-16 shrink-0 font-semibold">{e.date}</span>
                  {e.text}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="resultater"
            className="scroll-mt-24 rounded-[18px] border border-line-light bg-white px-8 py-7.5"
          >
            <h2 className="mb-3 text-[28px]">Resultater</h2>
            <ul>
              {RESULTS.map((r, i) => (
                <li
                  key={i}
                  className="flex justify-between gap-4 border-b border-line-light py-3.5 text-[15px] last:border-b-0"
                >
                  {r.name}
                  <a
                    href={r.href}
                    className="shrink-0 font-semibold text-pool hover:underline"
                  >
                    Se resultater
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section id="praktisk" className="scroll-mt-24">
          <h2 className="mb-5.5 text-[clamp(28px,3.4vw,34px)]">
            Kontingent og praktisk info
          </h2>
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
            {PRACTICAL.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-2 rounded-2xl bg-foam-dim p-6.5"
              >
                <h3 className="font-sans text-[19px] font-semibold">
                  {p.title}
                </h3>
                <p className="text-[15px] text-muted">{p.text}</p>
                {p.href && (
                  <Link
                    href={p.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[15px] font-semibold text-pool hover:underline"
                  >
                    Gå til klubbutstyr
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
