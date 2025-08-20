import type { User } from "../types";

export default function Directory({ title, users }: { title: string; users: User[] }) {
  return (
    <div className="text-white max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <a
            key={u.id}
            href={`/live/profile/${u.id}`}
            className="bg-black/40 rounded-2xl p-4 hover:bg-black/50 transition text-white"
          >
            <div className="flex items-center gap-3">
              <img src={u.avatar} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold">{u.displayName}</div>
                <div className="text-xs opacity-70">
                  {u.role} • {u.location}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
