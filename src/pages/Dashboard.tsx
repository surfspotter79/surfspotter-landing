import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById, loadUsers, saveUsers } from "../data/demoUsers";
import type { DemoUser } from "../types/users";

export default function Dashboard() {
  const { id } = useParams();
  const [user, setUser] = useState<DemoUser | undefined>();

  useEffect(() => { setUser(id ? getUserById(id) : undefined); }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div>
          <p>Not found.</p>
          <Link to="/demos" className="underline">Back to directory</Link>
        </div>
      </div>
    );
  }

  const addToCart = (photoId: string, price: number) => {
    const all = loadUsers();
    const me = all.find(u => u.id === user.id)!;
    me.cart.push({ photoId, price });
    saveUsers(all);
    setUser({ ...me });
  };

  const totalCart = user.cart.reduce((s, it) => s + it.price, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-4 flex items-center gap-4">
          <img src={user.avatarUrl} className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-neutral-500">{user.role}</div>
          </div>
          <Link to="/demos" className="text-sm underline">All demo users</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-10">
        <section>
          <h2 className="text-lg font-semibold mb-3">Stacks</h2>
          <div className="flex gap-3 flex-wrap">
            {user.portfolio.stacks.map(st => (
              <div key={st.id} className="rounded-xl border bg-white p-3 w-[260px]">
                <div className="font-medium mb-2">{st.title}</div>
                <div className="grid grid-cols-3 gap-1">
                  {st.photoIds.slice(0, 6).map(pid => {
                    const p = user.portfolio.albums.flatMap(a => a.photos).find(x => x.id === pid)!;
                    return <img key={pid} src={p.url} className="h-16 w-full object-cover rounded" />;
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Albums</h2>
          {user.portfolio.albums.map(al => (
            <div key={al.id} className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{al.title}</div>
                <div className="text-sm text-neutral-500">{al.photos.length} photos</div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                {al.photos.map(p => (
                  <div key={p.id} className="rounded-xl overflow-hidden border bg-white">
                    <img src={p.url} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-3 flex items-center justify-between">
                      <div className="text-sm">{p.title}</div>
                      <button
                        onClick={() => addToCart(p.id, p.price ?? 19)}
                        className="text-xs px-2 py-1 rounded bg-black text-white"
                      >
                        Add €{p.price ?? 19}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-xl border bg-white p-4">
          <div className="font-semibold mb-2">Cart</div>
          {user.cart.length === 0 ? (
            <div className="text-sm text-neutral-500">Cart is empty.</div>
          ) : (
            <div className="text-sm">
              {user.cart.length} items • Total <b>€{totalCart}</b>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
