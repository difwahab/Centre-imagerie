import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import express, { type Express } from 'express';
import type { Server } from 'http';

// ✅ Support de __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Middleware Vite en développement
export async function setupVite(app: Express, server: Server) {
  try {
    const vite = await createViteServer({
      root: path.resolve(__dirname, '../client'),
      server: {
        middlewareMode: true,
        hmr: {
          server, // 🔁 HMR relié au serveur HTTP existant
        },
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    log('✅ Vite middleware configuré avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la configuration de Vite :', error);
  }
}

// 📦 Serveur statique en production
export function serveStatic(app: Express) {
  const staticPath = path.resolve(__dirname, '../client/dist'); // ✅ Corrigé ici

  if (!fs.existsSync(staticPath)) {
    console.warn('⚠️ Dossier statique introuvable :', staticPath);
    return;
  }

  app.use(express.static(staticPath));

  // ✅ Fallback SPA pour React Router
  app.get('*', (_req, res) => {
    const indexPath = path.join(staticPath, 'index.html');

    if (!fs.existsSync(indexPath)) {
      console.error('❌ Fichier `index.html` manquant dans `client/dist` !');
      return res.status(404).send('Erreur : Fichier introuvable.');
    }

    res.sendFile(indexPath);
  });

  log('✅ Fichiers statiques servis depuis ' + staticPath);
}

// 📋 Logger centralisé
function log(msg: string) {
  console.log(`[VITE] ${msg}`);
}
