import { Injectable } from "@nestjs/common";
import { spawn } from "child_process";
import { resolve } from "path";

type CalculationOperation = 'sum' | 'multiply';

@Injectable()
export class ToolsService {
    getConfigInfo() {
        return {
            appName: process.env.APP_NAME || 'NestJS Demo',
            port: Number(process.env.PORT) || 5000,
            operation: process.env.OPERATION || 'sum',
        };
    }

    getProcessInfo() {
        return {
            pid: process.pid,
            nodeVersion: process.version,
            argv: process.argv,
        };
    }

    normalizeOperation(operation?: string): CalculationOperation {
        if (!operation) {
            return process.env.OPERATION === 'multiply' ? 'multiply' : 'sum';
        }

        if (operation === 'mul' || operation === 'multiply') {
            return 'multiply';
        }

        return 'sum';
    }

    async calculateWithChild(numbers: number[], operation?: string) {
        const scriptPath = resolve(process.cwd(), 'scripts', 'calc-child.js');
        const normalizedOperation = this.normalizeOperation(operation);

        return new Promise((resolvePromise, rejectPromise) => {
            // Lanzamos un proceso aparte para separar responsabilidades.

            const child = spawn(process.execPath, [scriptPath, ...numbers.map(String)], {
                env: {
                    ...process.env,
                    OPERATION: normalizedOperation,
                },
            });

            let stdout = '';
            let stderr = '';

            child.stdout.on('data', (chunk) => {
                stdout += chunk.toString();
            });

            child.stderr.on('data', (chunk) => {
                stderr += chunk.toString();
            });

            child.on('close', (code) => {
                if(code !== 0) {
                    rejectPromise(new Error(stderr || 'El proceso hijo temino con error'));
                    return;
                }

                try{
                    resolvePromise(JSON.parse(stdout));
                } catch {
                    rejectPromise(new Error('La Salida del proceso hijo no se pudo parsear.'));
                }
            });
        });
    }
}
