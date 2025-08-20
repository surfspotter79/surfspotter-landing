import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const isStaticLiveHtml = window.location.pathname.endsWith("/live.html");
// Use no basename when previewing /live.html locally; use /live in prod.
const basename = isStaticLiveHtml ? "" : "/live";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
