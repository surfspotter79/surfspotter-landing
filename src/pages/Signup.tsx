import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen grid place-items-center" style={{ background: "linear-gradient(135deg,#ff6a3d,#ff3d77)" }}>
      <div className="bg-white/90 backdrop-blur rounded-2xl p-8 w-[min(560px,90vw)] shadow-2xl">
        <h1 className="text-2xl font-semibold mb-2">Create your SurfSpotter account</h1>
        <p className="text-sm text-neutral-600 mb-6">
          For demo purposes you can also use pre-created accounts.
        </p>

        <div className="grid gap-3 mb-6">
          <button className="h-10 rounded-lg border">Continue with Apple</button>
          <button className="h-10 rounded-lg border">Continue with Google</button>
          <button className="h-10 rounded-lg border">Continue with Facebook</button>
        </div>

        <div className="text-sm">
          Want to explore? <Link className="underline" to="/demos">Open demo directory</Link>.
        </div>
      </div>
    </div>
  );
}
