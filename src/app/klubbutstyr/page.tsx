import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";

export const metadata: Metadata = {
  title: "Klubbutstyr | Bergen Stupeklubb",
};

// TODO: Add the real equipment page (products, sizes, how to order).
export default function Klubbutstyr() {
  return (
    <PageHeader title="Klubbutstyr" crumb="Klubbutstyr" tone="pool">
      <p className="max-w-[50ch] text-[17px] text-foam/80">
        Klubbtøy fra Craft: treningsjakker, hettegensere, t-skjorter og shorts.
      </p>
    </PageHeader>
  );
}
