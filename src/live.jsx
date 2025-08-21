import React from "react";
import { createRoot } from "react-dom/client";

function SafeApp() {
  return (
    <main style={{fontFamily:"system-ui,-apple-system,Segoe UI,Roboto",
                  maxWidth:720, margin:"48px auto", padding:24}}>
      <h1>✅ App is running</h1>
      <p>
        If you can see this, the white screen is gone. 
        We’ll remove test-only code (it/describe) next.
      </p>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SafeApp />
  </React.StrictMode>
);
