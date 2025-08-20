import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Directory from "./pages/Directory"; // your existing simple directory is fine

export default function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<Directory />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/demos" element={<Directory />} />
        <Route path="/photographers" element={<Directory filter="pro-photographer" />} />
        <Route path="/pro-surfers"   element={<Directory filter="pro-surfer" />} />
        <Route path="/schools"       element={<Directory filter="surf-school" />} />
        <Route path="/amateur-photographers" element={<Directory filter="amateur-photographer" />} />
        <Route path="/amateur-surfers"       element={<Directory filter="amateur-surfer" />} />
        <Route path="/users"         element={<Directory filter="user" />} />
      </Routes>
    </>
  );
}
