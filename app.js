import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { Command } from 'commander';
import { fork } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const program = new Command();
program
    .option("-e, --env <environment>", "Entorno de ejecucion", "dev"); // -> default (set)
program.parse(process.argv);

const { env } = program.opts() // -> get 

const envName = env // Defaul dev

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
const SECRET = process.env.SECRET || "Secreto";

if (Number.isNaN(PORT)) {
    console.error(`PORT invalido en ${envFilePath}; "${rawPort}"`)
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hola desde Node.!")
})

app.get('/secreto', (req, res) => {
    res.send(`Mi Secreto es: "${SECRET}"`)
})

/**
 * Ruta que ejecuta un proceso hijo.
 * fork() crea otro proceso de Node y ejecuta child.js
 */
app.get('/child', (req, res) => {
    // Resolvemos la ruta absoluta del proceso hijo
    const childPath = resolve(__dirname, './child.js');

    // Creamos el proceso hijo
    const child = fork(childPath);

    // Escuchamos el mensaje del proceso hijo -> Enviado con process.send().
    child.on('message', (msj) => {
        res.send(`Mensaje del proceso hijo: "${msj}"`)
    })

    // Si ocurre un error en el hijo, informamos y respondemos con error 500.
    child.on('error', (error) => {
        console.error(`Mensaje de error del proceso hijo: ${error}`);
        res.status(500).send("Error ejecutando el proceso hijo.!")
    });

    // Este evento se dispara cuando el hijo termina su ejecucion
    child.on('exit', (code) => {
        console.log(childPath);
        console.log(`Proceso hijo termino con codigo ${code}`);
    });

})

app.listen(PORT, () => { console.log(`Escuchando en http://localhost:${PORT}`) });