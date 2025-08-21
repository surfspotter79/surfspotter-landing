// src/components/PhotoCard.tsx
import { Link } from "react-router-dom";
import SmartImage from "./SmartImage";

type Photo = {
  id: string;
  spot: string;
  url: string;
  likes?: number;
};

export default function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <Link
      to={`/photo/${photo.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "4/3",
          overflow: "hidden",
          borderRadius: 12,
          background: "#f4f5f7",
          border: "1px solid rgba(0,0,0,.08)",
        }}
      >
        <SmartImage
          src={photo.url}
          alt={photo.spot}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: 8,
        }}
      >
        <div style={{ fontWeight: 600 }}>{photo.spot}</div>
        <div title="Likes">❤️ {photo.likes ?? 0}</div>
      </div>
    </Link>
  );
}
