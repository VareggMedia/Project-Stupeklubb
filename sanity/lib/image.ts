import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Respects the editor's hotspot and crop when width and height are both set.
export const urlFor = (source: SanityImageSource) => builder.image(source).auto("format");
