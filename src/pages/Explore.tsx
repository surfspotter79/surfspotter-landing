import { useEffect, useMemo, useState } from "react";
import { loadUsers, seedDemosIfEmpty } from "../data/demoUsers";
import type { DemoUser, Photo, Role } from "../types/users";

function useQuery() {
  const [qs, setQs] = useState(() => new URLSearchParams(window.location.hash.split("?")[1] || ""));
  useEffect(() => {
    const onHash = () => setQs(new URLSearchParams(window.location.hash.split("?")[1] || ""));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return qs;
}

export default function Explore() {
  const qs = useQuery();
  const cat = (qs.get("cat") || "pro_photographer") as (Role | "spots");

  useEffect(() => { seedDemosIfEmpty(); }, []);
  const users = loadUsers();

  const selectedUsers: DemoUser[] = useMemo(() => {
    if (cat === "spots") return users; // for now: all photos treated as “spots”
    return users.filter(u => u.role === cat);
  }, [users, cat]);

  const allPhotos: Photo[] = useMemo(() => {
    return selectedUsers.flatMap(u => u.portfolio.albums.flatMap(a => a.photos));
  }, [selectedUsers]);

  const topLiked = useMemo(
    () => [...allPhotos].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)),
    [allPhotos]
  );

  const latest = useMemo(
    () => [...allPhotos].sort(
      (a, b) => new Date(b.uploadedAt ?? 0).getTime() - new Date(a.uploadedAt ?? 0).getTime()
    ).slice(0, 12),
    [allPhotos]
  );

  const title = {
    pro_photographer: "Pro Photographers",
    pro_surfer: "Pro Surfers",
    surf_school: "Surf Schools",
    amateur_surfer: "Amateur Surfers",
    amateur_photographer: "Amateur Photographers",
    spots: "Spots",
    basic_user: "Users"
  }[cat];

  return (
    <div className="min-h-screen">
      <header className="p-5 border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          <a href="/#/" className="text-sm underline">Back to landing</a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-5 space-y-10">
        <section>
          <h2 className="text-lg font-semibold mb-2">Latest uploads</h2>
          <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {latest.map(p => (
              <figure key={p.id} className="rounded-xl overflow-hidden border bg-white">
                <img src={p.url} alt={p.title} className="aspect-[4/3] object-cover w-full" />
                <figcaption className="text-sm p-2 flex items-center justify-between">
                  <span>{p.title ?? "Surf Shot"}</span>
                  <span title="likes">❤️ {p.likes ?? 0}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Most liked</h2>
          <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {topLiked.map(p => (
              <figure key={p.id} className="rounded-xl overflow-hidden border bg-white">
                <img src={p.url} alt={p.title} className="aspect-[4/3] object-cover w-full" />
                <figcaption className="text-sm p-2 flex items-center justify-between">
                  <span>{p.title ?? "Surf Shot"}</span>
                  <span title="likes">❤️ {p.likes ?? 0}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
