import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import BackBar from "../components/BackBar";
import PhotoCard from "../components/PhotoCard";
import { getPhotos, type Photo } from "../data/seed";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Explore() {
  const q = useQuery();
  const cat = q.get("cat") || "spots";
  const photos: Photo[] = getPhotos();

  return (
    <div>
      <BackBar title={cat === "spots" ? "Surf Spots" : "Explore"} />
      <div style={{ maxWidth: 1100, margin: "14px auto", padding: "0 16px" }}>
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))"
          }}
        >
          {photos.map((p) => (
            <PhotoCard key={p.id} photo={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
