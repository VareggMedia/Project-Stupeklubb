import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Sponsors from "../components/Sponsors";
import { TESTIMONIALS } from "../data/club";

export const metadata: Metadata = {
  title: "Om klubben | Bergen Stupeklubb",
  description: "Bergens eneste stupeklubb, med trening i ADO Arena.",
};

// TODO: Replace the [BRACKETED] placeholders with the club's real info.
const ABOUT = [
  {
    title: "Klubben",
    text: "Bergens eneste stupeklubb, med trening i ADO Arena midt i sentrum. [Kort historie: når klubben ble startet, og hvor mange medlemmer den har.]",
  },
  {
    title: "Trenerne",
    text: "Erfarne trenere som tilpasser treningen til hver enkelt, fra første hopp til konkurransenivå. [Navn og bilder av trenerne.]",
  },
  {
    title: "Styret",
    text: "[Hvem sitter i styret, og hvordan man kontakter dem.]",
  },
];

export default function OmKlubben() {
  return (
    <>
      <PageHeader title="Om klubben" crumb="Om klubben" tone="pool" />

      <div className="wrap py-20 max-[900px]:py-14">
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {ABOUT.map((a) => (
            <section key={a.title} className="rounded-[20px] bg-foam-dim p-9">
              <h2 className="text-[26px]">{a.title}</h2>
              <p className="mt-3 text-base text-muted">{a.text}</p>
            </section>
          ))}
        </div>

        <h2 className="mt-20 mb-7 text-[clamp(26px,3vw,34px)]">
          Hva medlemmene sier
        </h2>
        <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-[20px] border border-line-light bg-white p-8"
            >
              <blockquote className="font-display text-xl leading-snug">
                «{t.quote}»
              </blockquote>
              <figcaption className="mt-4 text-[15px] text-muted">
                {t.name}, {t.detail}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Sponsors />
    </>
  );
}
