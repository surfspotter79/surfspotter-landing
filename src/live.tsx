// src/live.tsx
import "./shims";
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Explore from "./pages/Explore";
import PhotoDetail from "./pages/PhotoDetail";

function Placeholder({ title }: { title: string }) {
  return <div style={{ padding: 24, fontSize: 20 }}>{title}</div>;
}

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/explore?cat=spots" replace />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />
        <Route path="/signup" element={<Placeholder title="Signup (coming soon)" />} />
        <Route path="/demos" element={<Placeholder title="Demos (coming soon)" />} />
        <Route path="*" element={<Placeholder title="Not found" />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")!).render(<AppRoutes />);
