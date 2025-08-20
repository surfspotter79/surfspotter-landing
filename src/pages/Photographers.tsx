import Directory from "./Directory";
import { demoPhotographers } from "../data/demo";
export default function Photographers() {
  return <Directory title="Pro Photographers" users={demoPhotographers} />;
}
