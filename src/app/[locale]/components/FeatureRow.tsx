import type { ReactNode } from "react";

type FeatureRowProps = {
  title: string;
  art: ReactNode;
  children: ReactNode;
  id?: string;
  reverse?: boolean; // art on the left, copy on the right
  lightArt?: boolean; // pale art panel instead of the dark pool gradient
  last?: boolean; // drop the bottom divider
};

export default function FeatureRow({
  title,
  art,
  children,
  id,
  reverse = false,
  lightArt = false,
  last = false,
}: FeatureRowProps) {
  return (
    <div
      id={id}
      className={`grid items-center gap-16 py-22 max-[900px]:grid-cols-1 max-[900px]:gap-7.5 max-[900px]:py-14 ${
        reverse ? "grid-cols-[1.15fr_0.85fr]" : "grid-cols-[0.85fr_1.15fr]"
      } ${last ? "" : "border-b border-line-light"}`}
    >
      <div
        className={`[&_p]:mt-4.5 [&_p]:max-w-[46ch] [&_p]:text-base [&_p]:text-muted [&>a]:mt-6.5 ${
          reverse ? "order-2 max-[900px]:order-none" : ""
        }`}
      >
        <h2 className="max-w-[14ch] text-[clamp(26px,3vw,34px)] text-ink">
          {title}
        </h2>
        {children}
      </div>
      <div
        className={`relative h-65 overflow-hidden rounded bg-linear-155 max-[900px]:h-50 [&>svg]:absolute [&>svg]:inset-0 [&>svg]:size-full ${
          lightArt ? "from-foam-dim to-[#d9e8e5]" : "from-pool to-pool-light"
        } ${reverse ? "order-1 max-[900px]:order-none" : ""}`}
      >
        {art}
      </div>
    </div>
  );
}
