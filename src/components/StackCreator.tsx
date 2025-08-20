import { useState } from "react";
import { addUserStack } from "../lib/localDb";
import type { Stack, Photo } from "../types";

const genId = () => Math.random().toString(36).slice(2);

export default function StackCreator({ userId, onCreated }: {
  userId: string; onCreated: (stack: Stack) => void;
}) {
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState("");

  const submit = () => {
    const list = urls.split(/\s+/).filter(Boolean);
    if (!title || list.length === 0) return;
    const photos: Photo[] = list.map((src, i) => ({ id: genId()+i, src }));
    const stack: Stack = {
      id: genId(),
      title,
      createdAt: new Date().toISOString(),
      coverSrc: list[0],
      photos
    };
    addUserStack(userId, stack);
    onCreated(stack);
    setTitle(""); setUrls("");
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h3 className="font-semibold text-white mb-2">Create a new Stack (demo)</h3>
      <div className="grid gap-2">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Stack title (e.g., Sunset Session)"
          className="px-3 py-2 rounded bg-black/40 text-white outline-none border border-white/10"
        />
        <textarea
          value={urls}
          onChange={e => setUrls(e.target.value)}
          placeholder="Paste one or more image URLs (space/newline separated)"
          className="px-3 py-2 h-28 rounded bg-black/40 text-white outline-none border border-white/10"
        />
        <button
          onClick={submit}
          className="justify-self-start px-3 py-2 bg-emerald-500 text-black rounded-lg font-medium"
        >
          Add Stack
        </button>
      </div>
    </div>
  );
}
