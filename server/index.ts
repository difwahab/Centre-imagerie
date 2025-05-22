// server/index.ts
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pgSession from 'connect-pg-simple';
import { Pool } from 'pg';

// Charger les variables d'environnement
dotenv.config();

// Récupération de __dirname pour les modules ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application Express
const app = express();

// Middlewares de sécurité
app.use(helmet());

// Middleware CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Middleware pour parser le JSON
app.use(express.json());

// Configuration de la session avec PostgreSQL
const PgSession = pgSession(session);

app.use(session({
  store: new PgSession({
    pool: new Pool({ connectionString: process.env.DATABASE_URL }),
    tableName: 'session',
  }),
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 jour
  },
}));

// Exemple de route API
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// ⚠️ En production, servir le frontend compilé
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../dist/client');
  app.use(express.static(clientBuildPath));

  // Rediriger toutes les autres routes vers index.html (SPA)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Démarrer le serveur
const PORT = process.env.PORT || 3000;

export async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erreur au démarrage du serveur :', err);
    process.exit(1);
  }
}

// Lancer le serveur si ce fichier est exécuté directement
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer();
}
