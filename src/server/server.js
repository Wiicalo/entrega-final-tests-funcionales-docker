import express from 'express';
import dotenv from 'dotenv';

import logger from '../config/logger.js';
import userRoutes from '../routes/user.router.js';

dotenv.config();

const app = express();

app.use(express.json());


// Middleware general de auditoria
app.use((req, res, next) => {
    logger.http(`Solicitud entrante: ${req.method} | URL: ${req.url}`);
    next();
})

app.use('/api/users', userRoutes);

const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : 3000;

if (Number.isNaN(PORT)) {
    logger.error(`PORT invalido en ${envFilePath}; "${rawPort}"`)
}


export function startServer() {
    app.listen(PORT, () => { logger.info(`Escuchando en http://localhost:${PORT}`) });
};