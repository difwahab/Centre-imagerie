import './i18n'; // Initialise i18next (doit être fait avant React)
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from './components/ui/toaster';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("L'élément #root est introuvable dans index.html");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);