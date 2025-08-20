// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ExplorePage from "./pages/Explore";
import Signup from "./pages/Signup";
import PhotoDetail from "./pages/PhotoDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/explore" replace />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/photo/:id" element={<PhotoDetail />} />
      <Route path="*" element={<Navigate to="/explore" replace />} />
    </Routes>
  );
}
