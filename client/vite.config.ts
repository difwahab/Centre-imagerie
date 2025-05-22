// client/vite.config.ts
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import path from 'path';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: [path.resolve(__dirname, '../tsconfig.client.json')],
    }),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use(
          history({
            disableDotRule: true,
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          })
        );
      },
    },
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },

  server: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0',
    cors: true,
    open: false,
  },

  build: {
    outDir: path.resolve(__dirname, '../dist/client'),
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
  },

  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
