import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Article images from the Sanity CDN
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // The Studio moved to the Stupeklubb-CMS repository; keep the old bookmark working.
  async redirects() {
    return [{ source: "/studio/:path*", destination: "https://stupeklubb.sanity.studio", permanent: false }];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
