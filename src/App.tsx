// src/App.tsx
import React from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500 text-white">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-6xl font-bold mb-4">Surfspotter</h1>
        <p className="opacity-90 mb-8">
          Orange gradient demo app — if you can read this, routing works 🎉
        </p>
        <nav className="flex gap-3 justify-center flex-wrap">
          <Link className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur" to="/">Home</Link>
          <Link className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur" to="/photographers">Photographers</Link>
          <Link className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur" to="/schools">Schools</Link>
          <Link className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur" to="/surfers">Surfers</Link>
          <Link className="rounded-lg bg-white/20 px-4 py-2 backdrop-blur" to="/signup">Sign up</Link>
        </nav>
      </div>
    </div>
  );
}

function Directory({ title }: { title: string }) {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-orange-400 to-pink-500 text-white">
      <h2 className="text-4xl font-semibold mb-6">{title}</h2>
      <p className="opacity-90 mb-6">Directory page placeholder.</p>
      <Link className="underline" to="/">← Back home</Link>
    </div>
  );
}

function Signup() {
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-orange-400 to-pink-500 text-white">
      <h2 className="text-4xl font-semibold mb-6">Create your account</h2>
      <form className="grid gap-4 max-w-md">
        <input className="px-3 py-2 rounded text-black" placeholder="Email" />
        <input className="px-3 py-2 rounded text-black" placeholder="Name" />
        <select className="px-3 py-2 rounded text-black" defaultValue="">
          <option value="" disabled>Select role…</option>
          <option>Surfer</option>
          <option>Pro Surfer</option>
          <option>Amateur Photographer</option>
          <option>Pro Photographer</option>
          <option>Surf School</option>
        </select>
        <button type="button" className="px-4 py-2 bg-white text-black rounded">
          Continue
        </button>
      </form>
      <div className="mt-8">
        <Link className="underline" to="/">← Back home</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photographers" element={<Directory title="Photographers" />} />
        <Route path="/schools" element={<Directory title="Surf Schools" />} />
        <Route path="/surfers" element={<Directory title="Surfers" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </HashRouter>
  );
}
