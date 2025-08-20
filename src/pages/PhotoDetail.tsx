// src/pages/PhotoDetail.tsx
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import BackBar from "../components/BackBar";
import { getPhoto, getStackFor } from "../data/seed";

export default function PhotoDetail() {
  const { id = "" } = useParams();
  const photo = getPhoto(id);
  const stack = useMemo(() => (photo ? getStackFor(photo) : []), [photo]);

  if (!photo) {
    return (
      <div>
        <BackBar title="Photo" />
        <div style={{ padding: 16 }}>Photo not found.</div>
      </div>
    );
  }

  const stackCount = stack.length;
  const stackSubtotal = stack.reduce((sum, p) => sum + p.priceCents, 0);
  const stackTotal = Math.round(stackSubtotal * 0.8); // 20% bundle discount

  async function checkoutSingle() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: "eur",
        successUrl: `${location.origin}/live#/thankyou`,
        cancelUrl: `${location.origin}/live#/photo/${photo.id}`,
        items: [
          {
            name: `${photo.spot} – Photo`,
            amount: photo.priceCents,
            quantity: 1,
            // You can pass metadata like photoId to fulfill later:
            metadata: { photoId: photo.id }
          }
        ]
      })
    });
    const json = await res.json();
    if (json?.url) location.href = json.url;
  }

  async function checkoutStack() {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currency: "eur",
        successUrl: `${location.origin}/live#/thankyou`,
        cancelUrl: `${location.origin}/live#/photo/${photo.id}`,
        items: [
          {
            name: `${photo.spot} – Stack (${stackCount} photos)`,
            amount: stackTotal,
            quantity: 1,
            metadata: { stackSpot: photo.spot, userId: photo.userId }
          }
        ]
      })
    });
    const json = await res.json();
    if (json?.url) location.href = json.url;
  }

  return (
    <div>
      <BackBar title={photo.spot} />
      <div style={{ maxWidth: 1100, margin: "14px auto", padding: "0 16px", display: "grid", gap: 16 }}>
        {/* Large image with watermark */}
        <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(0,0,0,.08)" }}>
          <div style={{ position: "relative", aspectRatio: "4/3", background: "#f4f5f7" }}>
            <img
              src={photo.url}
              alt={photo.spot}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(5%)" }}
            />
            {/* Watermark overlay */}
            <div style={wmOverlay}>SurfSpotter</div>
          </div>
        </div>

        {/* Info + buy */}
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h2 style={{ margin: 0 }}>{photo.spot}</h2>
            <div title="Likes">❤️ {photo.likes}</div>
          </div>
          <div style={{ opacity: 0.8, fontSize: 14 }}>
            Uploaded {new Date(photo.createdAt).toLocaleDateString()} • ID {photo.id}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            <button onClick={checkoutSingle} style={btnPrimary}>
              Buy Photo — €{(photo.priceCents / 100).toFixed(2)}
            </button>
            {stackCount > 1 && (
              <button onClick={checkoutStack} style={btn}>
                Buy Stack ({stackCount}) — €{(stackTotal / 100).toFixed(2)}
              </button>
            )}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            Watermark will be removed from the high-resolution download after payment.
          </div>
        </div>
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,.12)",
  background: "#fff",
  cursor: "pointer",
  fontWeight: 600
};
const btnPrimary: React.CSSProperties = { ...btn, background: "#111", color: "#fff", borderColor: "#111" };

// Big diagonal watermark overlay
const wmOverlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  fontSize: "8vw",
  fontWeight: 900,
  color: "rgba(255,255,255,.35)",
  textTransform: "uppercase",
  letterSpacing: 2,
  transform: "rotate(-18deg)",
  userSelect: "none",
  pointerEvents: "none",
  mixBlendMode: "overlay"
};
