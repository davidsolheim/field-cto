import { getSiteContent } from "@/lib/content";
import { generateOgImage, OG_SIZE } from "@/lib/og/generate-og-image";

export const runtime = "nodejs";
export const alt = getSiteContent().meta.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return generateOgImage();
}
