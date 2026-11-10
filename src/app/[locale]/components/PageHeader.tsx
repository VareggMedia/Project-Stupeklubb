import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
  title: string;
  crumb: string; // label for this page in the breadcrumb
  tone?: "aqua" | "pool"; // aqua = "Bli med" door, pool = "For medlemmer" door
  children?: ReactNode;
};

export default function PageHeader({
  title,
  crumb,
  tone = "pool",
  children,
}: PageHeaderProps) {
  const t = useTranslations("Common");
  const isAqua = tone === "aqua";
  return (
    <section
      className={`pt-32 pb-16 max-[900px]:pt-28 max-[900px]:pb-12 ${
        // The global focus ring is aqua, which disappears on an aqua header, so use ink here.
        isAqua
          ? "bg-aqua text-ink [&_:focus-visible]:outline-ink"
          : "bg-pool text-foam"
      }`}
    >
      <div className="wrap">
        <nav aria-label={t("breadcrumb")} className="text-[14px] font-semibold">
          <Link
            href="/"
            className="group inline-flex items-center gap-1 hover:underline"
          >
            <ArrowLeft
              size={14}
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:-translate-x-0.5"
            />
            {t("home")}
          </Link>
          <span aria-hidden="true" className="mx-2 opacity-60">
            /
          </span>
        </nav>
        <h1 className="mt-5 max-w-[18ch] text-balance text-[clamp(36px,5vw,58px)] leading-[1.03]">
          {title}
        </h1>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
