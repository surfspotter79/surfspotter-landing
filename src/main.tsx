import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// When you open /live.html locally, don't use a basename.
// In production (Vercel), we serve at /live via vercel.json.
const isStaticLiveHtml = window.location.pathname.endsWith("/live.html");
const basename = isStaticLiveHtml ? "" : "/live";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
