import { SPONSORS } from "../data/club";

export default function Sponsors() {
  return (
    <section className="bg-foam pb-24" id="sponsorer">
      <div className="wrap">
        <h2 className="mb-10 text-center font-sans text-[22px] font-semibold text-muted">
          Våre sponsorer
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {SPONSORS.map((sponsor) => (
            <div
              className="flex h-25 w-60 items-center justify-center"
              key={sponsor.name}
            >
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="size-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
