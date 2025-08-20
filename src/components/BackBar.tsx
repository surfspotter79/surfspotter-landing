// src/components/BackBar.tsx
export default function BackBar({ title }: { title?: string }) {
  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: "rgba(255,255,255,.9)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(0,0,0,.06)",
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      gap: 10
    }}>
      <button
        onClick={() => window.history.back()}
        style={{
          borderRadius: 8,
          border: "1px solid rgba(0,0,0,.12)",
          background: "#fff",
          padding: "6px 10px",
          cursor: "pointer"
        }}
        aria-label="Go back"
      >← Back</button>
      {title && <strong>{title}</strong>}
    </div>
  );
}
