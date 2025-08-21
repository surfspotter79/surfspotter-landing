import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
// very early in your app startup:
window.addEventListener('error', (e) => {
  const el = document.getElementById('root') || document.body;
  const msg = document.createElement('pre');
  msg.style.whiteSpace = 'pre-wrap';
  msg.style.background = '#fee';
  msg.style.padding = '12px';
  msg.style.border = '1px solid #f88';
  msg.textContent = 'Runtime error: ' + (e.error?.stack || e.message);
  el.prepend(msg);
});