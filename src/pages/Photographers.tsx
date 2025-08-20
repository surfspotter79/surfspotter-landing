import Directory from "./Directories.tsx";
import { demoPhotographers } from "../data/demo";
export default function Photographers() {
  return <Directory title="Pro Photographers" users={demoPhotographers} />;
}
