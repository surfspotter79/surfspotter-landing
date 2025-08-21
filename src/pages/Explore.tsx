// src/pages/Explore.tsx
import * as React from "react";
import { useSearchParams } from "react-router-dom";
import BackBar from "../components/BackBar";
import SmartImage from "../components/SmartImage";
import UserCard from "../components/UserCard";

/**
 * This page has 2 modes controlled by URL params:
 * - List mode:  /explore?cat=pro_photographer     -> shows ranked creators
 * - Portfolio:  /explore?cat=...&user=<userId>    -> shows that creator's photos (inline)
 *
 * We dynamically import your demo users and photos if available.
 * If not, we fall back to small, bundled demo data so the page never breaks.
 */

type AnyUser = any;
type AnyPhoto = { id: string; userId?: string; spot?: string; url: string; likes?: number; createdAt?: string };

const FALLBACK_USERS: AnyUser[] = [
  {
    id: "alex-morgan",
    name: "Alex Morgan",
    avatarUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    type: "pro_photographer",
    likesTotal: 421,
    viewsTotal: 18234,
  },
  {
    id: "hana-lee",
    name: "Hana Lee",
    avatarUrl: "https://images.unsplash.com/photo-1490698911541-0bdb7d4ed9fe?auto=format&fit=crop&w=1600&q=80",
    type: "pro_photographer",
    likesTotal: 389,
    viewsTotal: 15522,
  },
  {
    id: "kai-rider",
    name: "Kai Rider",
    avatarUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    type: "pro_surfer",
    likesTotal: 512,
    viewsTotal: 30122,
  },
  {
    id: "mara-school",
    name: "Mara Surf School",
    avatarUrl: "https://images.unsplash.com/photo-1504600773772-f1c4b3c0bb2f?auto=format&fit=crop&w=1600&q=80",
    type: "surf_school",
    likesTotal: 210,
    viewsTotal: 10110,
  },
  {
    id: "jules-amateur",
    name: "Jules",
    avatarUrl: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1600&q=80",
    type: "amateur_surfer",
    likesTotal: 120,
    viewsTotal: 5221,
  },
  {
    id: "rhea-amateur-photo",
    name: "Rhea",
    avatarUrl: "https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?auto=format&fit=crop&w=1600&q=80",
    type: "amateur_photographer",
    likesTotal: 99,
    viewsTotal: 4312,
  },
];

const FALLBACK_PORTFOLIOS: Record<string, AnyPhoto[]> = {
  "alex-morgan": [
    { id: "p1", userId: "alex-morgan", url: "photo-1500375592092-39e3c2a43a3f" },
    { id: "p2", userId: "alex-morgan", url: "photo-1441829266145-b7a5f54f2445" },
    { id: "p3", userId: "alex-morgan", url: "photo-1504600773772-f1c4b3c0bb2f" },
    { id: "p4", userId: "alex-morgan", url: "photo-1499244571948-7ccddb3583f1" },
  ],
  "hana-lee": [
    { id: "p1", userId: "hana-lee", url: "photo-1500530855697-b586d89ba3ee" },
    { id: "p2", userId: "hana-lee", url: "photo-1507525428034-b723cf961d3e" },
    { id: "p3", userId: "hana-lee", url: "photo-1487730116645-74489c95b41b" },
  ],
  "kai-rider": [
    { id: "p1", userId: "kai-rider", url: "photo-1516567727245-6a39e646fcb5" },
    { id: "p2", userId: "kai-rider", url: "photo-1507525428034-b723cf961d3e" },
  ],
};

const LABELS: Record<string, string> = {
  pro_photographer: "Pro Photographers",
  pro_surfer: "Pro Surfers",
  surf_school: "Surf Schools",
  amateur_surfer: "Amateur Surfers",
  amateur_photographer: "Amateur Photographers",
  spots: "Spots",
};

export default function Explore() {
  const [sp, setSp] = useSearchParams();
  const cat = sp.get("cat") || "pro_photographer";
  const userId = sp.get("user") || "";

  // load users (prefer your data/demoUsers.ts; else fallback)
  const [users, setUsers] = React.useState<AnyUser[]>(FALLBACK_USERS);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mod: any = await import("../data/demoUsers");
        const arr: AnyUser[] = mod?.demoUsers || mod?.default || [];
        if (!cancelled && Array.isArray(arr) && arr.length) {
          setUsers(arr);
        }
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // filter to category
  const filtered = React.useMemo(() => {
    const alias = (u: AnyUser) =>
      (u.type || u.category || u.role || "").toLowerCase();
    return users
      .filter((u) => {
        if (cat === "spots") return false; // (we’ll add a Spots section later)
        return alias(u) === cat;
      })
      .sort((a, b) => {
        const la = a.likesTotal ?? a.likes ?? a.metrics?.likes ?? 0;
        const lb = b.likesTotal ?? b.likes ?? b.metrics?.likes ?? 0;
        if (lb !== la) return lb - la;
        const va = a.viewsTotal ?? a.views ?? a.metrics?.views ?? 0;
        const vb = b.viewsTotal ?? b.views ?? b.metrics?.views ?? 0;
        return vb - va;
      });
  }, [users, cat]);

  // portfolio: load photos from your seed if available; otherwise fallback map
  const [portfolio, setPortfolio] = React.useState<AnyPhoto[]>([]);
  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!userId) {
        setPortfolio([]);
        return;
      }
      // start with fallback
      const fb = FALLBACK_PORTFOLIOS[userId] || [];
      setPortfolio(fb);

      // try to import your data/seed and filter by userId
      try {
        const seed: any = await import("../data/seed");
        const arr: AnyPhoto[] =
          seed?.photos ||
          seed?.PHOTOS ||
          seed?.allPhotos ||
          seed?.demoPhotos ||
          [];
        if (!cancelled && Array.isArray(arr) && arr.length) {
          const mine = arr.filter((p) => (p as any).userId === userId);
          if (mine.length) setPortfolio(mine);
        }
      } catch {
        // keep fallback
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // helpers
  const openPortfolio = (id: string) => {
    sp.set("user", id);
    setSp(sp);
  };
  const closePortfolio = () => {
    sp.delete("user");
    setSp(sp);
  };

  // UI
  const title = LABELS[cat] || "Explore";

  return (
    <div>
      <BackBar title={userId ? "Portfolio" : title} />

      {/* Portfolio mode */}
      {userId ? (
        <div style={{ maxWidth: 1100, margin: "14px auto", padding: "0 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <h2 style={{ margin: 0 }}>Creator Portfolio</h2>
            <button onClick={closePortfolio} style={btn}>← Back to {title}</button>
          </div>

          {portfolio.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No photos found for this creator yet.</div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              {portfolio.map((p) => (
                <div key={p.id} style={{ border: "1px solid rgba(0,0,0,.08)", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", background: "#f4f5f7" }}>
                    <SmartImage
                      src={p.url}
                      alt={p.spot || "Photo"}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // List mode
        <div style={{ maxWidth: 1100, margin: "14px auto", padding: "0 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <h2 style={{ margin: 0 }}>
              Top {title} <span style={{ fontSize: 14, opacity: 0.8 }}>(ranked by likes, then views)</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No creators in this category yet.</div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              {filtered.map((u) => (
                <UserCard key={u.id} user={u} onOpen={openPortfolio} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,.12)",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};
