import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { allUsers } from "../data/demo";
import { getUserStacks } from "../lib/localDb";
import StackCreator from "../components/StackCreator";
import type { Stack } from "../types";

export default function Profile() {
  const { id } = useParams();
  const user = useMemo(() => allUsers.find(u => u.id === id), [id]);

  const [extraStacks, setExtraStacks] = useState<Stack[]>(
    user ? getUserStacks(user.id) : []
  );

  if (!user) return <div className="text-white p-10">User not found.</div>;

  const allStacks = [...user.stacks, ...extraStacks];

  return (
    <div className="text-white max-w-6xl mx-auto px-4 py-10">
      <div className="flex gap-4 items-center">
        <img src={user.avatar} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h2 className="text-3xl font-semibold">{user.displayName}</h2>
          <div className="text-sm opacity-75">{user.role} • {user.location}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <h3 className="font-semibold mb-3">Stacks</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {allStacks.map(s => (
              <div key={s.id} className="bg-black/40 rounded-xl overflow-hidden">
                <img src={s.coverSrc} className="w-full aspect-[16/9] object-cover" />
                <div className="p-3">
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs opacity-70">
                    {new Date(s.createdAt).toLocaleDateString()} • {s.photos.length} photos
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Demo-only creation */}
          <StackCreator
            userId={user.id}
            onCreated={(stack) => setExtraStacks((prev) => [stack, ...prev])}
          />
          <p className="text-xs opacity-70">
            Demo mode: newly created stacks are saved to your browser’s localStorage.
          </p>
        </div>
      </div>
    </div>
  );
}
