import { useMemo, useState } from "react";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // true for LCP (detail/hero)
  rounded?: boolean;
};

// Build Cloudinary fetch URL with compression + optional text watermark
function toCloudinaryFetch(original: string, w = 1200, h = 900) {
  const cloud = import.meta.env.VITE_CLOUD_NAME;
  if (!cloud) return null;
  const t = [
    `w_${w}`, `h_${h}`, "c_fill",    // cover box
    "f_auto", "q_auto", "dpr_auto",  // compression
    // watermark
    "l_text:Montserrat_60_bold:SurfSpotter", "co_white", "o_35",
    "g_south_east", "x_40", "y_40"
  ].join(",");
  return `https://res.cloudinary.com/${cloud}/image/fetch/${t}/${encodeURIComponent(original)}`;
}

export default function SmartImage({
  src, alt, width = 600, height = 450, className = "", priority = false, rounded = true,
}: Props) {
  // Try: original -> cloudinary (if configured) -> local fallback
  const cloudURL = useMemo(() => toCloudinaryFetch(src, width, height), [src, width, height]);
  const sources = useMemo(() => {
    const arr = [src];
    if (cloudURL) arr.push(cloudURL);
    arr.push("/hero/hero.jpg");
    return arr;
  }, [src, cloudURL]);

  const [idx, setIdx] = useState(0);
  const chosen = sources[idx];

  return (
    <div
      className={`relative overflow-hidden ${rounded ? "rounded-xl" : ""}`}
      style={{aspectRatio: `${width}/${height}`, background: "#eef2f7"}}
    >
      <img
        src={chosen}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        width={width}
        height={height}
        onError={() => setIdx((i) => Math.min(i + 1, sources.length - 1))}
        className={`w-full h-full object-cover block ${className}`}
      />
      <!-- Watermark overlay (CSS) -->
      <span
        aria-hidden="true"
        style="
          position:absolute; inset:0;
          background-image: radial-gradient(transparent, transparent 60%, rgba(0,0,0,.06));
          pointer-events:none;
        "
      ></span>
      <span
        aria-hidden="true"
        style="
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          font: 700 48px/1 system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
          color: rgba(255,255,255,.28); letter-spacing:.12em; transform: rotate(-14deg);
          text-shadow: 0 2px 16px rgba(0,0,0,.15);
          pointer-events:none;
        "
      >SURFSPOTTER</span>
    </div>
  );
}
