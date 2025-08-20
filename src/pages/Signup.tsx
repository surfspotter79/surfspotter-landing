import { useState } from "react";
import { Link } from "react-router-dom";
import BackBar from "../components/BackBar";

const ROLES = [
  { id: "surfer", label: "Surfer" },
  { id: "pro_surfer", label: "Pro Surfer" },
  { id: "pro_photographer", label: "Pro Photographer" },
  { id: "amateur_photographer", label: "Amateur Photographer" },
  { id: "surf_school", label: "Surf School" },
];

export default function Signup() {
  const [role, setRole] = useState<string>("surfer");

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg,#ff6a3d,#ff3d77)" }}>
      {/* Back button */}
      <BackBar title="Create your SurfSpotter account" />

      <div className="grid place-items-center px-4 py-8">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-8 w-[min(720px,92vw)] shadow-2xl">
          <h1 className="text-2xl font-semibold mb-2">Create your SurfSpotter account</h1>
          <p className="text-sm text-neutral-600 mb-6">
            Choose your role and continue with your preferred provider. (Demo only — no real auth yet.)
          </p>

          {/* Role picker */}
          <div className="mb-6">
            <div className="mb-2 text-neutral-700">I am a:</div>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={[
                    "px-3 py-2 rounded-full border text-sm",
                    role === r.id ? "bg-black text-white border-black" : "bg-white text-black"
                  ].join(" ")}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* OAuth buttons */}
          <div className="grid gap-3 mb-6">
            <button className="h-10 rounded-lg border bg-white">Continue with Google</button>
            <button className="h-10 rounded-lg border bg-white">Continue with Apple</button>
            <button className="h-10 rounded-lg border bg-white">Continue with Facebook</button>
          </div>

          <div className="text-sm text-neutral-600">
            For demo purposes you can also use pre-created accounts.{" "}
            <Link className="underline" to="/demos">
              Open demo directory
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
