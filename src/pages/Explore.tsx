import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BackBar from "../components/BackBar";
import { getPhotos } from "../data/seed";

type Photo = {
  id: string;
  url: string;
  spot: string;
  userId?: string;
  author?: string;
  likes?: number;
  views?: number;
  createdAt?: string | number | Date;
};

type Agg = {
  key: string;        // userId or author (for creators) OR spot (for spots)
  label: string;      // author name or spot name
  coverUrl: string;   // one representative photo
  totalLikes: number;
  totalViews: number;
  photoCount: number;
};

export default function Explore() {
  const [params] = useSearchParams();
  const cat = (params.get("cat") || "spots").toLowerCase();
  const photos = (getPhotos?.() ?? []) as Photo[];

  const [sortBy, setSortBy] = useState<"likes" | "views">("likes");
  const isSpotMode = cat === "spots";

  const filtered = photos;

  const aggregates = useMemo<Agg[]>(() => {
    const map = new Map<string, Agg>();

    for (const p of filtered) {
      const key = isSpotMode ? p.spot : (p.userId || p.author || "unknown");
      const label = isSpotMode ? p.spot : (p.author || `User ${key}`);
      const likes = Number(p.likes ?? 0);
      const views = Number(p.views ?? 0);

      const prev = map.get(key);
      if (!prev) {
        map.set(key, {
          key,
          label,
          coverUrl: p.url,
          totalLikes: likes,
          totalViews: views,
          photoCount: 1,
        });
      } else {
        prev.totalLikes += likes;
        prev.totalViews += views;
        prev.photoCount += 1;
      }
    }

    const list = Array.from(map.values());
    list.sort((a, b) => {
      const primary =
        sortBy === "likes"
          ? b.totalLikes - a.totalLikes
          : b.totalViews - a.totalViews;
      if (primary !== 0) return primary;
      return b.photoCount - a.photoCount;
    });
    return list;
  }, [filtered, isSpotMode, sortBy]);

  return (
    <div>
      <BackBar title={isSpotMode ? "Top Spots" : titleForCat(cat)} />

      <div style={wrap}>
        <div style={controls}>
          <button
            style={sortBy === "likes" ? btnPrimary : btn}
            onClick={() => setSortBy("likes")}
          >
            Top by Likes
          </button>
          <button
            style={sortBy === "views" ? btnPrimary : btn}
            onClick={() => setSortBy("views")}
          >
            Top by Views
          </button>
        </div>

        {aggregates.length === 0 ? (
          <div style={{ padding: 16, opacity: 0.7 }}>
            No items yet. Try another category.
          </div>
        ) : (
          <div style={grid}>
            {aggregates.map((a) => {
              const CardInner = (
                <div style={card}>
                  <div style={thumbWrap}>
                    <img
                      alt={a.label}
                      src={a.coverUrl}
                      loading="lazy"
                      style={thumb}
                    />
                    <div style={wm}>SurfSpotter</div>
                  </div>

                  <div style={{ padding: 12 }}>
                    <div style={title}>{a.label}</div>
                    <div style={meta}>
                      <span>❤️ {a.totalLikes}</span>
                      <span>👁️ {a.totalViews}</span>
                      <span>🖼️ {a.photoCount}</span>
                    </div>
                  </div>
                </div>
              );

              // Only creators are linkable (not spots)
              return isSpotMode ? (
                <div key={a.key}>{CardInner}</div>
              ) : (
                <Link
                  key={a.key}
                  to={`/creator/${encodeURIComponent(a.key)}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {CardInner}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function titleForCat(cat: string) {
  switch (cat) {
    case "pro_photographer":
      return "Top Pro Photographers";
    case "pro_surfer":
      return "Top Pro Surfers";
    case "surf_school":
      return "Top Surf Schools";
    case "amateur_surfer":
      return "Top Amateur Surfers";
    case "amateur_photographer":
      return "Top Amateur Photographers";
    default:
      return "Explore";
  }
}

/* styles */
const wrap: React.CSSProperties = {
  maxWidth: 1200,
  margin: "10px auto 24px",
  padding: "0 16px",
};
const controls: React.CSSProperties = {
  display: "flex",
  gap: 8,
  margin: "8px 0 16px",
  flexWrap: "wrap",
};
const btn: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid rgba(0,0,0,.12)",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};
const btnPrimary: React.CSSProperties = {
  ...btn,
  background: "#111",
  color: "#fff",
  borderColor: "#111",
};
const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 14,
};
const card: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,.08)",
  borderRadius: 12,
  overflow: "hidden",
  background: "#fff",
};
const thumbWrap: React.CSSProperties = {
  position: "relative",
  aspectRatio: "4/3",
  background: "#f4f5f7",
  overflow: "hidden",
};
const thumb: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
const wm: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  fontSize: "9vw",
  fontWeight: 900,
  color: "rgba(255,255,255,.35)",
  textTransform: "uppercase",
  letterSpacing: 2,
  transform: "rotate(-18deg)",
  userSelect: "none",
  pointerEvents: "none",
  mixBlendMode: "overlay",
};
const title: React.CSSProperties = { fontWeight: 700, marginBottom: 6 };
const meta: React.CSSProperties = {
  display: "flex",
  gap: 10,
  fontSize: 12,
  opacity: 0.8,
};
