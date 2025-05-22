import express, { Application } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Obtenir __dirname (spécifique aux modules ES)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = express();

// Middleware CORS & body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de log des requêtes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Exemple de route API
app.get("/route-du-get", (req, res) => {
  console.log("Requête GET reçue !");
  res.json({ message: "GET fonctionne !" });
});

// Dossier du frontend compilé (ex: Vite, React, etc.)
const frontendDistPath = path.resolve(__dirname, "../client/dist");

// Vérification du dossier
if (!fs.existsSync(frontendDistPath)) {
  console.warn(`⚠️ Dossier compilé introuvable : ${frontendDistPath}. Tu dois exécuter 'npm run build' dans le client.`);
}

// Servir les fichiers statiques du frontend
app.use(express.static(frontendDistPath));

// Rediriger toutes les routes vers index.html (SPA)
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error(`❌ Erreur serveur : ${err.message}`);
});
app.use(express.static(path.join(__dirname, "../client"), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  }
}));