import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-white max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-3">Surfspotter — demo</h1>
      <p className="opacity-80 mb-8">
        Explore demo users and portfolios. Photographers & schools can create stacks (demo-only).
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/photographers" className="bg-black/40 rounded-xl p-5 hover:bg-black/50">→ Pro Photographers</Link>
        <Link to="/schools" className="bg-black/40 rounded-xl p-5 hover:bg-black/50">→ Surf Schools</Link>
        <Link to="/surfers" className="bg-black/40 rounded-xl p-5 hover:bg-black/50">→ Pro Surfers</Link>
        <Link to="/users" className="bg-black/40 rounded-xl p-5 hover:bg-black/50">→ Visitors</Link>
      </div>
    </div>
  );
}
