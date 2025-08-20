import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  const item = "px-3 py-2 rounded hover:bg-white/10";
  const active = ({ isActive }: any) =>
    `${item} ${isActive ? "bg-white/10" : ""}`;
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/30">
      <div className="max-w-6xl mx-auto flex items-center gap-4 px-4 py-3 text-white">
        <Link to="/" className="font-semibold">Surfspotter</Link>
        <nav className="flex gap-1 text-sm">
          <NavLink to="/photographers" className={active}>Photographers</NavLink>
          <NavLink to="/schools" className={active}>Schools</NavLink>
          <NavLink to="/surfers" className={active}>Surfers</NavLink>
          <NavLink to="/users" className={active}>Visitors</NavLink>
        </nav>
        <div className="ml-auto text-xs opacity-70">demo mode</div>
      </div>
    </header>
  );
}
