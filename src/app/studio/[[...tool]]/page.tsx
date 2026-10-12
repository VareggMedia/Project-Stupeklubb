import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// The Studio is a client-side app; serve one static shell for every /studio/* path.
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
