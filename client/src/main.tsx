import './i18n'; // Doit être importé avant le rendu de React (initialise i18next)
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "./components/ui/toaster";

const rootElement = document.getElementById("root"); // Assumé présent par Vite
if (!rootElement) {
  throw new Error("Élément #root introuvable dans index.html");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <>
      <App />
      <Toaster />
    </>
  </React.StrictMode>
);
