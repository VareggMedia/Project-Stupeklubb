import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import PageHeader from "../components/PageHeader";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/klubbutstyr">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "GearPage" });
  return { title: t("title") };
}

// TODO: Add the real equipment page (products, sizes, how to order).
export default function Klubbutstyr() {
  const t = useTranslations("GearPage");
  return (
    <PageHeader title={t("title")} crumb={t("title")} tone="pool">
      <p className="max-w-[50ch] text-[17px] text-foam/80">
        {t("text")}
      </p>
    </PageHeader>
  );
}
