import { useTranslations } from "next-intl";
import { SPONSORS } from "../data/club";

export default function Sponsors() {
  const t = useTranslations("Sponsors");
  return (
    <section className="bg-aqua-bg pb-24" id="sponsorer">
      <div className="wrap">
        <h2 className="mb-10 text-center font-sans text-[22px] font-semibold text-muted">
          {t("title")}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {SPONSORS.map((sponsor) => (
            <a
              key={sponsor.name}

              href={sponsor.url}

              target="_blank"

              rel="noopener noreferrer"

              aria-label={`Visit ${sponsor.name} website`}

              className="flex h-25 w-60 items-center justify-center"
            >
              <img
                src={sponsor.image}

                alt={sponsor.name}

                className="size-full object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
