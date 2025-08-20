import { Route, Routes, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Photographers from "./pages/Photographers";
import Schools from "./pages/Schools";
import Surfers from "./pages/Surfers";
import Visitors from "./pages/Visitors";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-rose-600">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photographers" element={<Photographers />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/surfers" element={<Surfers />} />
        <Route path="/users" element={<Visitors />} />
        <Route path="/profile/:id" element={<Profile />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
