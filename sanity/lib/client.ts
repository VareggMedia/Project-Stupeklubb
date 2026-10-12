import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Read-only client for the public dataset; the CDN is fine with 60 s revalidation.
export const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

// Pages re-fetch at most once a minute, so new articles appear without a deploy.
export const REVALIDATE_SECONDS = 60;
