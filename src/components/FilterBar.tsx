// src/components/FilterBar.tsx
import type { Category } from "../data/seed";

const LABELS: Record<Category, string> = {
  pro_photographer: "Pro Photographers",
  pro_surfer: "Pro Surfers",
  surf_school: "Surf Schools",
  amateur_photographer: "Amateur Photographers",
  amateur_surfer: "Amateur Surfers",
  spots: "Spots",
};

export function FilterBar({
  cat,
  sort,
  onCat,
  onSort,
}: {
  cat: Category;
  sort: "mostLiked" | "latest";
  onCat: (c: Category) => void;
  onSort: (s: "mostLiked" | "latest") => void;
}) {
  const cats: Category[] = [
    "pro_photographer",
    "pro_surfer",
    "surf_school",
    "amateur_photographer",
    "amateur_surfer",
    "spots",
  ];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {/* Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => onCat(c)}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,.12)",
              background: c === cat ? "#111" : "#fff",
              color: c === cat ? "#fff" : "#111",
              cursor: "pointer",
            }}
          >
            {LABELS[c]}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ opacity: 0.8 }}>Sort:</span>
        <button
          onClick={() => onSort("mostLiked")}
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,.12)",
            background: sort === "mostLiked" ? "#111" : "#fff",
            color: sort === "mostLiked" ? "#fff" : "#111",
            cursor: "pointer",
          }}
        >
          Most liked
        </button>
        <button
          onClick={() => onSort("latest")}
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,.12)",
            background: sort === "latest" ? "#111" : "#fff",
            color: sort === "latest" ? "#fff" : "#111",
            cursor: "pointer",
          }}
        >
          Latest
        </button>
      </div>
    </div>
  );
}
