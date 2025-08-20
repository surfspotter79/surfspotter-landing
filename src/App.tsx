cat > src/App.tsx <<'TSX'
import { Route, Routes, Navigate, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Photographers from "./pages/Photographers";
import Schools from "./pages/Schools";
import Surfers from "./pages/Surfers";
import Visitors from "./pages/Visitors";
import Profile from "./pages/Profile";

const item = "px-3 py-2 rounded hover:bg-white/10";
const active = ({ isActive }: any) => `${item} ${isActive ? "bg-white/10" : ""}`;

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-rose-600">
      <header className="sticky top-0 z-20 backdrop-blur bg-black/30">
        <div className="max-w-6xl mx-auto flex items-center gap-4 px-4 py-3 text-white">
          <Link to="/" className="font-semibold">Surfspotter</Link>
          <nav className="flex gap-1 text-sm">
            <NavLink to="/photographers" className={active}>Photographers</NavLink>
            <NavLink to="/schools" className={active}>Schools</NavLink>
            <NavLink to="/surfers" className={active}>Surfers</NavLink>
            <NavLink to="/users" className={active}>Visitors</NavLink>
          </nav>
          <div className="ml-auto text-xs opacity-70">demo</div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photographers" element={<Photographers />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/surfers" element={<Surfers />} />
        <Route path="/users" element={<Visitors />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
TSX