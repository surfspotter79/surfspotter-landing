// src/pages/Explore.tsx
import { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ensureDemoSeed, filterAndSortPhotos, getUsers, type Category } from "../data/seed";
import { FilterBar } from "../components/FilterBar";
import BackBar from "../components/BackBar";

function useQueryState() {
  const [sp, setSp] = useSearchParams();
  const cat = (sp.get("cat") as Category) || "spots";
  const sort = (sp.get("sort") as "mostLiked" | "latest") || "mostLiked";
  const setCat = (c: Category) => { sp.set("cat", c); setSp(sp, { replace: true }); };
  const setSort = (s: "mostLiked" | "latest") => { sp.set("sort", s); setSp(sp, { replace: true }); };
  return { cat, sort, setCat, setSort };
}

export default function ExplorePage() {
  useEffect(() => { ensureDemoSeed(); }, []);
  const { cat, sort, setCat, setSort } = useQueryState();
  const navigate = useNavigate();

  const photos = useMemo(() => filterAndSortPhotos(cat, sort), [cat, sort]);
  const usersById = useMemo(() => {
    const m = new Map(getUsers().map(u => [u.id, u]));
    return m;
  }, []);

  return (
    <div>
      <BackBar title="Explore" />
      <div style={{ padding: "20px 16px", maxWidth: 1200, margin: "0 auto" }}>
        <FilterBar cat={cat} sort={sort} onCat={setCat} onSort={setSort} />

        {sort === "latest" && (
          <div style={{ marginTop: 18, padding: 12, borderRadius: 12, background: "rgba(0,0,0,.05)" }}>
            Latest uploads in <strong>{cat.replace("_", " ")}</strong>
          </div>
        )}

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {photos.map((p) => {
            const u = usersById.get(p.userId);
            return (
              <button
                key={p.id}
                onClick={() => navigate(`/photo/${p.id}`)}
                style={{
                  textAlign: "left",
                  border: "1px solid rgba(0,0,0,.08)",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 8px 24px rgba(0,0,0,.06)",
                  cursor: "pointer",
                  padding: 0
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4/3", background: "#f4f5f7" }}>
                  <img
                    src={p.url}
                    alt={`${p.spot}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(5%)" }}
                    loading="lazy"
                  />
                  <div style={wmThumb}>SurfSpotter</div>
                </div>
                <div style={{ padding: 10, display: "grid", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong>{p.spot}</strong>
                    <span title="Likes">❤️ {p.likes}</span>
                  </div>
                  {u && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.9 }}>
                      <img
                        src={u.avatar}
                        alt={u.name}
                        width={24}
                        height={24}
                        style={{ borderRadius: "50%" }}
                      />
                      <span style={{ fontSize: 14 }}>{u.name}</span>
                    </div>
                  )}
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {photos.length === 0 && (
          <p style={{ marginTop: 24, opacity: 0.7 }}>No photos yet for this category.</p>
        )}
      </div>
    </div>
  );
}

const wmThumb: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  fontSize: "28px",
  fontWeight: 900,
  color: "rgba(255,255,255,.4)",
  textTransform: "uppercase",
  letterSpacing: 2,
  transform: "rotate(-18deg)",
  userSelect: "none",
  pointerEvents: "none",
  mixBlendMode: "overlay"
};
