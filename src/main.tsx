import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/App.css";

const container = document.getElementById("root") as HTMLElement | null;
if (!container) {
  throw new Error('Root element with ID "root" not found in the document.');
}

const root = createRoot(container);
root.render(<App />);
