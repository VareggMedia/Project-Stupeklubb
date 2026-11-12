import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, type Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/src/i18n/routing";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import BackToTop from "./components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Metadata",
  });
  return {
    // Pages set only their own title, e.g. "Om klubben | Bergen Stupeklubb"
    title: { default: t("siteTitle"), template: `%s | ${t("siteTitle")}` },
    description: t("siteDescription"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const tCommon = await getTranslations({ locale, namespace: "Common" });

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-foam font-sans leading-normal text-ink">
        <NextIntlClientProvider>
          {/* Skip link: hidden until focused with Tab, lets keyboard users jump past the menu */}
          <a
            href="#innhold"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-foam focus:px-4 focus:py-2.5 focus:font-semibold focus:text-ink"
          >
            {tCommon("skipToContent")}
          </a>
          <Navbar />
          <main id="innhold" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
