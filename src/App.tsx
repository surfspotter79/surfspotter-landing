// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ExplorePage from "./pages/Explore";
// If you already have these pages, keep them; otherwise they are optional routes.
// import SignUp from "./pages/SignUp";
// import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      {/* default inside /live → explore */}
      <Route path="/" element={<Navigate to="/explore" replace />} />
      <Route path="/explore" element={<ExplorePage />} />

      {/* keep your existing routes if present */}
      {/* <Route path="/signup" element={<SignUp />} /> */}
      {/* <Route path="/dashboard/:id" element={<Dashboard />} /> */}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/explore" replace />} />
    </Routes>
  );
}
