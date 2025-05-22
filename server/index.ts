import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import http from "http";
import { setupVite, serveStatic } from "./vite";

// 📍 __dirname compatible ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📦 Créer l'application Express
const app: Express = express();

// 📦 Créer le serveur HTTP pour HMR
const server = http.createServer(app);

// === Middlewares globaux ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🪵 Logger simple
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// === Routes API ===
app.get("/api/test", (_req, res) => {
  res.json({ message: "API GET fonctionne !" });
});

// === Intégration Vite (dev) ou Fichiers statiques (prod) ===
if (process.env.NODE_ENV === "production") {
  serveStatic(app);
} else {
  setupVite(app, server);
}

// === Démarrage du serveur ===
const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error(`❌ Erreur serveur : ${err.message}`);
});
