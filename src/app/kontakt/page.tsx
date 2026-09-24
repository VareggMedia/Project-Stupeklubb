import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Kontakt | Bergen Stupeklubb",
};

// Contact details live in the footer, which is shown right below this header.
export default function Kontakt() {
  return (
    <PageHeader title="Kontakt oss" crumb="Kontakt" tone="pool">
      <p className="max-w-[50ch] text-[17px] text-foam/80">
        Lurer du på noe om kurs, medlemskap eller stevner? Send oss en e-post
        eller ring, så svarer vi så fort vi kan.
      </p>
    </PageHeader>
  );
}
