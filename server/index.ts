import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Correction
import { Application } from "express";

const app: Application = express();

// ✅ Configuration des middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Middleware pour afficher les requêtes reçues
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ Route GET corrigée
app.get("/route-du-get", (req, res) => {
  console.log("Requête GET reçue !");
  res.json({ message: "GET fonctionne !" });
});

// ✅ Gestion des fichiers statiques
const distPath = path.resolve(__dirname, "../client");
if (!fs.existsSync(distPath)) {
  console.warn(`⚠️ Dossier public introuvable : ${distPath}. Vérifie la compilation.`);
}
app.use(express.static(distPath));

// ✅ Route de secours pour éviter "Cannot GET"
app.use("*", (_req, res) => {
  res.status(404).json({ error: "Page non trouvée" });
});

// ✅ Lancement du serveur avec gestion des erreurs
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error(`❌ Erreur serveur : ${err.message}`);
});
