// src/components/UserCard.tsx
import * as React from "react";
import SmartImage from "./SmartImage";

type User = {
  id: string;
  name?: string;
  handle?: string;
  avatarUrl?: string;
  likesTotal?: number;
  viewsTotal?: number;
};

export default function UserCard({ user, onOpen }: { user: User; onOpen: (id: string) => void }) {
  const displayName = user.name || user.handle || user.id;
  return (
    <button
      onClick={() => onOpen(user.id)}
      style={{
        textAlign: "left",
        width: "100%",
        border: "1px solid rgba(0,0,0,.08)",
        borderRadius: 14,
        background: "#fff",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "4/3", background: "#f4f5f7" }}>
        <SmartImage
          src={user.avatarUrl || "https://images.unsplash.com/photo-1520975693414-9f8b6c5f8f6f?auto=format&fit=crop&w=1600&q=80"}
          alt={displayName}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: 12, display: "grid", gap: 4 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{displayName}</div>
        <div style={{ opacity: 0.8, fontSize: 13, display: "flex", gap: 12 }}>
          <span title="Total likes">❤️ {user.likesTotal ?? 0}</span>
          <span title="Total views">👁️ {user.viewsTotal ?? 0}</span>
        </div>
      </div>
    </button>
  );
}
