// src/components/SmartImage.tsx
import * as React from "react";

export function toAbsoluteUrl(u: string, w = 1600): string {
  if (!u) return "";
  if (/^https?:\/\//i.test(u)) return u;
  const id = u.replace(/^\/+/, "");
  if (/^photo-[a-z0-9-]+$/i.test(id)) {
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
  }
  return u;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  widthHint?: number;
};

export default function SmartImage({ src, widthHint = 1600, ...rest }: Props) {
  const [resolved, setResolved] = React.useState<string>(toAbsoluteUrl(src, widthHint));
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
