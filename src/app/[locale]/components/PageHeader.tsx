import Link from "next/link";
import type { ReactNode } from "react";

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
  const isAqua = tone === "aqua";
  return (
    <section
      className={`pt-32 pb-16 max-[900px]:pt-28 max-[900px]:pb-12 ${
        isAqua ? "bg-aqua text-ink" : "bg-pool text-foam"
      }`}
    >
      <div className="wrap">
        <nav aria-label="Brødsmuler" className="text-[14px] font-semibold">
          <Link href="/" className="hover:underline">
            Forside
          </Link>
          <span className="mx-2 opacity-60">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="mt-5 max-w-[16ch] text-[clamp(36px,5vw,58px)] leading-[1.03]">
          {title}
        </h1>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
