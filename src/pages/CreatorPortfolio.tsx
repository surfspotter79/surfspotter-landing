import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
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
};

const slugify = (s: string) =>
  (s || "")
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const creatorKey = (p: Photo) => p.userId || p.author || "unknown";

export default function CreatorPortfolio() {
  const params = useParams();
  const idParam = params.id || "";               // from /creator/:id
  const idCanon = slugify(idParam);              // normalize

  const photos = (getPhotos?.() ?? []) as Photo[];

  // Accept several possibilities:
  // - exact userId
  // - userId with hyphen/underscore normalized
  // - author's name slug
  const mine = useMemo(() => {
    return photos.filter((p) => {
      const a = slugify(creatorKey(p));
      const b = slugify(p.userId || "");
      return a === idCanon || b === idCanon;
    });
  }, [photos, idCanon]);

  if (mine.length === 0) {
    return (
      <div>
        <BackBar title="Portfolio" />
        <div style={{ padding: 16 }}>
          No photos found for this creator.
        </div>
      </div>
    );
  }

  const label = mine[0]?.author || mine[0]?.userId || "Creator";
  const totals = mine.reduce(
    (acc, p) => {
      acc.likes += Number(p.likes ?? 0);
      acc.views += Number(p.views ?? 0);
      return acc;
    },
    { likes: 0, views: 0 }
  );

  return (
    <div>
      <BackBar title={label} />
      <div style={{ maxWidth: 1100, margin: "12px auto", padding: "0 16px", display: "grid", gap: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={avatar}>{label.slice(0, 1).toUpperCase()}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{label}</div>
              <div style={{ opacity: 0.75, fontSize: 12 }}>
                ❤️ {totals.likes} · 👁️ {totals.views} · 🖼️ {mine.length}
              </div>
            </div>
          </div>
        </div>

        <div style={grid}>
          {mine.map((p) => (
            <Link
              key={p.id}
              to={`/photo/${p.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={card}>
                <div style={thumbWrap}>
                  <img
                    src={p.url}
                    alt={p.spot}
                    loading="lazy"
                    style={thumb}
                  />
                  <div style={wm}>SurfSpotter</div>
                </div>
                <div style={{ padding: 10, fontSize: 12, opacity: 0.85, display: "flex", gap: 10 }}>
                  <span>❤️ {p.likes ?? 0}</span>
                  <span>👁️ {p.views ?? 0}</span>
                  <span>{p.spot}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* styles */
const avatar: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "#eee",
  display: "grid",
  placeItems: "center",
  fontWeight: 700,
};
const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 12,
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
