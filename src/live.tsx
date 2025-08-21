// src/live.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// Use your existing pages. If one is missing, comment that line out.
import Explore from "./pages/Explore";
import PhotoDetail from "./pages/PhotoDetail";
// import Directory from "./pages/Directory";   // optional
// import Signup from "./pages/Signup";          // optional

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Landing -> Explore by default */}
        <Route path="/" element={<Navigate to="/explore?cat=spots" replace />} />

        <Route path="/explore" element={<Explore />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />

        {/* Uncomment if you have these pages */}
        {/* <Route path="/directory" element={<Directory />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}

        <Route
          path="*"
          element={
            <div style={{ padding: 16 }}>
              <h2>Not found</h2>
              <p>Try <code>/live.html#/explore?cat=spots</code></p>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

const el = document.getElementById("root");
if (!el) {
  throw new Error('Missing <div id="root"></div> in live.html');
}
createRoot(el).render(<App />);
