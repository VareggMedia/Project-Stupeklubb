import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

type Bilde = {
  alt?: string | null;
  asset?: { _id: string; metadata?: { lqip?: string | null } | null } | null;
} | null;

type Props = {
  bilde: Bilde | undefined;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

// Sanity image through next/image, cropped to width × height around the editor's hotspot.
export default function SanityBilde({ bilde, width, height, sizes, className, priority }: Props) {
  if (!bilde?.asset) return null;
  const lqip = bilde.asset.metadata?.lqip ?? undefined;
  return (
    <Image
      src={urlFor(bilde as SanityImageSource).width(width).height(height).fit("crop").url()}
      alt={bilde.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
    />
  );
}
