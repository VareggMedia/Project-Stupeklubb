import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip /api, the Sanity Studio, Next.js internals, and files with a dot (e.g. favicon.ico)
  matcher: "/((?!api|studio|trpc|_next|_vercel|.*\\..*).*)",
};
