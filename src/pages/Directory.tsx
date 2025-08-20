// src/pages/Directory.tsx
import { useEffect, useMemo, useState } from "react";
import type { Role, User } from "../types/users";
import { seedDemosIfEmpty, loadUsers } from "../data/demoUsers";

const TABS: Role[] = [
  "pro-photographer",
  "surf-school",
  "pro-surfer",
  "amateur-photographer",
  "surfer",
];

export default function Directory() {
  const [users, setUsers] = useState<User[]>([]);
  const [tab, setTab] = useState<Role>("pro-photographer");

  useEffect(() => {
    setUsers(seedDemosIfEmpty());
  }, []);

  const filtered = useMemo(
    () => users.filter((u) => u.role === tab),
    [users, tab]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-rose-500 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-extrabold mb-2">Demo Directory</h1>
        <p className="opacity-90 mb-8">
          5 users per role. These live only in your browser (localStorage) for now.
        </p>

        <div className="flex gap-2 mb-8">
          {TABS.map((r) => (
            <button
              key={r}
              onClick={() => setTab(r)}
              className={
                "px-3 py-2 rounded-md " +
                (tab === r ? "bg-white/25" : "bg-white/10 hover:bg-white/20")
              }
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((u) => (
            <div key={u.id} className="bg-white/10 rounded-2xl p-5 backdrop-blur">
              <div className="flex items-center gap-3 mb-3">
                <img src={u.avatarUrl} alt="" className="w-10 h-10 rounded-full bg-white/50" />
                <div>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm opacity-80">{u.role}</div>
                </div>
              </div>
              {u.stacks && u.stacks.length > 0 && (
                <div className="mt-3">
                  <div className="text-sm opacity-80 mb-2">Stacks</div>
                  <div className="grid grid-cols-2 gap-2">
                    {u.stacks.map((s) => (
                      <div key={s.id} className="rounded-lg overflow-hidden">
                        <img src={s.coverUrl} alt={s.title} className="w-full h-28 object-cover" />
                        <div className="text-xs px-2 py-1 bg-black/40">{s.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="opacity-90">No users yet for this role.</div>
        )}
      </div>
    </div>
  );
}
