import { useState } from "react";

type Props = { src: string; alt?: string; className?: string };

const FALLBACK =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=75&w=1200&auto=format&fit=crop";

export default function SmartImage({ src, alt = "", className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const url = failed ? FALLBACK : src;
  return (
    <img
      src={url}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
