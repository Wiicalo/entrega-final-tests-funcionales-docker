import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Command } from 'commander';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const program = new Command();
program.option("-e, --env <environment>", "Entorno de ejecucion");
program.parse();

const options = program.opts();
const envName = options.env || 'dev' // Defaul dev

const allowedEnvs = ['local', 'dev', 'prod', 'qa'];
if (!allowedEnvs.includes(envName)) {
    console.error(`Entorno invalido ${envName}`);
    console.error(`Usa uno de estos valores: ${allowedEnvs.join(' | ')}`);
    process.exit(1);
}

const envFilePath = `.env.${envName}`;

if (!fs.existsSync(envFilePath)) {
    console.error(`El Archivo ${envFilePath} no existe!`)
    process.exit(1);
}


dotenv.config({ path: envFilePath });

const app = express();
const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : 3000;

if (Number.isNaN(PORT)) {
    console.error(`PORT invalido en ${envFilePath}; "${rawPort}"`)
}

app.use(express.json());


app.listen(PORT, () => { console.log(`Escuchando en http://localhost:${PORT}`) });