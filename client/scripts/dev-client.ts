import detect from 'detect-port';
import { spawn } from 'child_process';

const DEFAULT_PORT = 5173;

async function start() {
  const port = await detect(DEFAULT_PORT);

  if (port !== DEFAULT_PORT) {
    console.warn(
      `⚠️ Port ${DEFAULT_PORT} est occupé. Utilisation du port libre ${port} à la place.`
    );
  }

  const vite = spawn('vite', ['--port', port.toString(), '--host', '--config', 'client/vite.config.ts'], {
    stdio: 'inherit',
    shell: true,
  });

  vite.on('close', (code) => {
    process.exit(code ?? 0);
  });
}

start();