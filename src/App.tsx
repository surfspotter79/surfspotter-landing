import { Routes, Route, Link, Navigate } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
        color: "white",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 760 }}>
        <h1 style={{ fontSize: 48, margin: 0 }}>Surfspotter</h1>
        <p style={{ opacity: 0.9, margin: "12px 0 24px" }}>
          Orange gradient demo app — if you can read this, routing works 🎉
        </p>
        <nav style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/photographers" style={linkStyle}>Photographers</Link>
          <Link to="/schools" style={linkStyle}>Schools</Link>
          <Link to="/surfers" style={linkStyle}>Surfers</Link>
        </nav>
      </div>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 8,
  background: "rgba(255,255,255,.15)",
  color: "white",
  textDecoration: "none",
  backdropFilter: "blur(6px)",
};

function Placeholder({ title }: { title: string }) {
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h2>{title}</h2>
        <p>Replace this route with your real page.</p>
        <p><Link to="/" style={{ textDecoration: "underline" }}>← Back home</Link></p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* IMPORTANT: keep root at "/" (basename handles /live in prod) */}
      <Route path="/" element={<Home />} />
      <Route path="/photographers" element={<Placeholder title="Photographers" />} />
      <Route path="/schools" element={<Placeholder title="Schools" />} />
      <Route path="/surfers" element={<Placeholder title="Surfers" />} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
