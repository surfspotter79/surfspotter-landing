import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Explore from "./pages/Explore";
import PhotoDetail from "./pages/PhotoDetail";
import CreatorPortfolio from "./pages/CreatorPortfolio";
import Signup from "./pages/Signup";
import Directory from "./pages/Directory";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/explore?cat=spots" replace />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/photo/:id" element={<PhotoDetail />} />
        <Route path="/creator/:id" element={<CreatorPortfolio />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/demos" element={<Directory />} />
        <Route path="*" element={<Navigate to="/explore?cat=spots" replace />} />
      </Routes>
    </HashRouter>
  );
}
