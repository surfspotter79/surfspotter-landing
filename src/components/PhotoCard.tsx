import { Link } from "react-router-dom";
import type { Photo } from "../data/seed";

type Props = { photo: Photo };

export default function PhotoCard({ photo }: Props) {
  return (
    <Link
      to={`/photo/${photo.id}`}
      style={{
        display: "block",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,.08)",
        textDecoration: "none",
        color: "inherit",
        background: "#fff"
      }}
    >
      <div style={{ position: "relative", aspectRatio: "4/3", background: "#f4f5f7" }}>
        <img
          src={photo.thumbUrl ?? photo.url}
          alt={photo.spot}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <div style={{ padding: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontWeight: 600 }}>{photo.spot}</div>
        <div style={{ opacity: 0.7, fontSize: 12 }}>€{(photo.priceCents / 100).toFixed(2)}</div>
      </div>
    </Link>
  );
}
