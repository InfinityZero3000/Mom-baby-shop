import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./lib/utils";

// Dynamically set basename based on environment
const basename = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? '/' 
  : '/Mom-baby-shop';

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
