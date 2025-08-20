import { Link } from "react-router-dom";
import type { User } from "../types";

export default function UserCard({ user }: { user: User }) {
  return (
    <Link
      to={`/profile/${user.id}`}
      className="bg-black/40 rounded-2xl p-4 hover:bg-black/50 transition text-white"
    >
      <div className="flex items-center gap-3">
        <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{user.displayName}</div>
          <div className="text-xs opacity-70">
            {user.role} • {user.location}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-3 rounded overflow-hidden">
        {user.stacks.slice(0, 3).map((s) => (
          <img key={s.id} src={s.coverSrc} className="aspect-[4/3] object-cover" />
        ))}
      </div>
    </Link>
  );
}
