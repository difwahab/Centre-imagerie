import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import * as path from "path";
import type { Express } from "express";
import type { Server } from "http";
import * as express from "express"; // ✅ Pas de `* as express`, utiliser `default`
import * as fs from "fs"; // ✅ Import propre de fs

// ✅ Support de __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Vite middleware en développement
export async function setupVite(app: Express, server: Server) {
  try {
    const vite = await createViteServer({
      root: path.resolve(__dirname, "../client"),
      server: {
        middlewareMode: true,
        hmr: { server },
      },
      appType: "custom",
    });

    app.use(vite.middlewares);
    log("✅ Vite middleware configuré avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors de la configuration de Vite :", error);
  }
}

// 📦 Fichiers statiques en production
export function serveStatic(app: Express) {
  const staticPath = path.resolve(__dirname, "../dist/public");

  if (!fs.existsSync(staticPath)) {
    console.warn("⚠️ Dossier statique introuvable :", staticPath);
    return;
  }

  app.use(express.static(staticPath));

  app.use("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");

    if (!fs.existsSync(indexPath)) {
      console.error("❌ Fichier `index.html` manquant dans `dist/public` !");
      return res.status(404).send("Erreur : Fichier introuvable.");
    }

    res.sendFile(indexPath);
  });

  log("✅ Fichiers statiques servis depuis " + staticPath);
}

// 📋 Logger central
export function log(msg: string) {
  console.log(`[VITE] ${msg}`);
}
