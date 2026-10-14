import { Link } from "@/src/i18n/navigation";
import type { NYHETER_QUERY_RESULT } from "@/sanity.types";
import SanityBilde from "./SanityBilde";
import { formatDato, utdrag } from "./format";

type Props = {
  nyhet: NYHETER_QUERY_RESULT[number];
  locale: string;
  // Clones in the endless carousel are hidden from keyboard and screen readers
  skjult?: boolean;
};

export default function NyhetKort({ nyhet, locale, skjult = false }: Props) {
  return (
    <article
      aria-hidden={skjult || undefined}
      className="group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(8,33,41,0.08)]"
    >
      <SanityBilde
        bilde={nyhet.hovedbilde}
        width={844}
        height={562}
        sizes="(max-width: 800px) 84vw, 422px"
        className="aspect-[3/2] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <time dateTime={nyhet.dato ?? undefined} className="text-[13px] font-semibold text-muted">
          {formatDato(nyhet.dato, locale)}
        </time>
        <h3 className="text-[21px] leading-tight">
          <Link
            href={`/nyheter/${nyhet.slug}`}
            tabIndex={skjult ? -1 : undefined}
            className="after:absolute after:inset-0 group-hover:underline"
          >
            {nyhet.tittel}
          </Link>
        </h3>
        <p className="line-clamp-3 text-[15px] text-muted">{utdrag(nyhet.ingress, nyhet.utdrag)}</p>
      </div>
    </article>
  );
}
