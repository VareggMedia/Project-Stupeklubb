// Public read config – the dataset is public, so the site needs no token.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2026-10-01";

if (!projectId) {
  throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is missing – see .env.example");
}
