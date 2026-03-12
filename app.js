import 'dotenv/config';
import app from './src/server/server.js';
import logger from './src/logs/logger.js';


const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : 3000;

if (Number.isNaN(PORT)) {
    logger.error(`PORT invalido en ${envFilePath}; "${rawPort}"`)
}

app.listen(PORT, () => { logger.info(`Escuchando en http://localhost:${PORT}`) });