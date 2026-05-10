import { fileURLToPath } from 'url';
import app, { startServer } from './src/server/server.js';

const isDirectExecution = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectExecution) {
    startServer();
}

export default app;
