// src/components/SmartImage.tsx
import * as React from "react";

/**
 * Converts short Unsplash IDs like "photo-1500375592092-39e3c2a43a3f"
 * (or "/photo-...") into a usable Unsplash URL. If it's already http(s),
 * it is returned unchanged.
 */
export function toAbsoluteUrl(u: string, w = 1600): string {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;

  const id = u.replace(/^\/+/, ""); // remove leading slashes

  if (/^photo-[a-z0-9-]+$/i.test(id)) {
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
  }

  // Otherwise assume it's a path you host in /public or similar
  return u;
}

// Fallback image (a surf shot) if the main image 404s
const FALLBACK =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  widthHint?: number; // optional resize hint for Unsplash
};

export default function SmartImage({ src, widthHint = 1600, ...rest }: Props) {
  const [resolved, setResolved] = React.useState<string>(
    toAbsoluteUrl(src, widthHint)
  );

  React.useEffect(() => {
    setResolved(toAbsoluteUrl(src, widthHint));
  }, [src, widthHint]);

  return (
    <img
      {...rest}
      src={resolved}
      loading="lazy"
      decoding="async"
      onError={() => setResolved(FALLBACK)}
    />
  );
}
