"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const path_1 = require("path");
let ToolsService = class ToolsService {
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
    normalizeOperation(operation) {
        if (!operation) {
            return process.env.OPERATION === 'multiply' ? 'multiply' : 'sum';
        }
        if (operation === 'mul' || operation === 'multiply') {
            return 'multiply';
        }
        return 'sum';
    }
    async calculateWithChild(numbers, operation) {
        const scriptPath = (0, path_1.resolve)(process.cwd(), 'scripts', 'calc-child.js');
        const normalizedOperation = this.normalizeOperation(operation);
        return new Promise((resolvePromise, rejectPromise) => {
            // Lanzamos un proceso aparte para separar responsabilidades.
            const child = (0, child_process_1.spawn)(process.execPath, [scriptPath, ...numbers.map(String)], {
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
                if (code !== 0) {
                    rejectPromise(new Error(stderr || 'El proceso hijo temino con error'));
                    return;
                }
                try {
                    resolvePromise(JSON.parse(stdout));
                }
                catch {
                    rejectPromise(new Error('La Salida del proceso hijo no se pudo parsear.'));
                }
            });
        });
    }
};
exports.ToolsService = ToolsService;
exports.ToolsService = ToolsService = __decorate([
    (0, common_1.Injectable)()
], ToolsService);
//# sourceMappingURL=tools.service.js.map