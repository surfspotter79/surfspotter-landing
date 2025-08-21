import { useEffect, useMemo, useState } from "react";
import { loadUsers, seedDemosIfEmpty } from "../data/demoUsers";
import type { DemoUser, Role } from "../types/users";
import { Link } from "react-router-dom";
import PhotoCard from "../components/PhotoCard";
import { surfThumbs } from "../data/sampleImages";

const ROLES: { key: Role; label: string }[] = [
  { key: "pro_photographer", label: "Pro Photographers" },
  { key: "surf_school", label: "Surf Schools" },
  { key: "pro_surfer", label: "Pro Surfers" },
  { key: "amateur_photographer", label: "Amateur Photographers" },
  { key: "amateur_surfer", label: "Amateur Surfers" },
  { key: "basic_user", label: "Basic Users" },
];

export default function Directory() {
  const [role, setRole] = useState<Role>("pro_photographer");
  const [users, setUsers] = useState<DemoUser[]>([]);

  useEffect(() => {
    // seed once
    seedDemosIfEmpty();
    setUsers(loadUsers());
  }, []);

  const list = useMemo(() => users.filter(u => u.role === role), [users, role]);

  return (
    <div className="min-h-screen p-8 text-white" style={{ background: "linear-gradient(135deg,#ff6a3d,#ff3d77)" }}>
      <h1 className="text-4xl font-semibold mb-6">Demo Accounts</h1>
      <p className="opacity-80 mb-6">Click a user to open their dashboard. All demo passwords: <b>demo1234</b>.</p>

      <div className="flex gap-2 flex-wrap mb-8">
        {ROLES.map(r => (
          <button
            key={r.key}
            onClick={() => setRole(r.key)}
            className={`px-3 py-1 rounded-full ${role === r.key ? "bg-white text-black" : "bg-white/20 hover:bg-white/30"}`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {list.map(u => (
          <div key={u.id} className="rounded-2xl bg-black/25 p-4 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <img src={u.avatarUrl} alt={u.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-sm opacity-70">{u.email}</div>
              </div>
            </div>
            <div className="text-sm opacity-80 mb-3">Albums: {u.portfolio.albums.length} • Stacks: {u.portfolio.stacks.length}</div>
            <Link to={`/dashboard/${u.id}`} className="inline-block px-3 py-2 rounded-lg bg-white text-black text-sm font-medium">
              Open Dashboard
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
