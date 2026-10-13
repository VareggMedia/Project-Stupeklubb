import type { Metadata } from "next";
import { type Locale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import PageHeader from "../components/PageHeader";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/kontakt">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "ContactPage" });
  return { title: t("metaTitle") };
}

// Contact details live in the footer, which is shown right below this header.
export default function Kontakt() {
  const t = useTranslations("ContactPage");
  return (
    <PageHeader title={t("title")} crumb={t("crumb")} tone="pool">
      <p className="max-w-[50ch] text-[17px] text-foam/80">
        {t("text")}
      </p>
    </PageHeader>
  );
}
