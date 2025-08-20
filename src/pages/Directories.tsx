import UserCard from "../components/UserCard";
import type { User } from "../types";

export default function Directory({ title, users }: { title: string; users: User[] }) {
  return (
    <div className="text-white max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(u => <UserCard key={u.id} user={u} />)}
      </div>
    </div>
  );
}
