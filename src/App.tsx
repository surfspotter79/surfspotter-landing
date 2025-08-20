import { Routes, Route, Navigate } from "react-router-dom";
import Directory from "./pages/Directory";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/demos" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/demos" element={<Directory />} />
      <Route path="/dashboard/:id" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/demos" replace />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  );
}
