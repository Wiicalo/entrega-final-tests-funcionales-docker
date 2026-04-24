"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolsController = void 0;
const common_1 = require("@nestjs/common");
const tools_service_1 = require("./tools.service");
let ToolsController = class ToolsController {
    constructor(toolsService) {
        this.toolsService = toolsService;
    }
    getConfig() {
        return this.toolsService.getConfigInfo();
    }
    getProcessInfo() {
        return this.toolsService.getProcessInfo();
    }
    async calculate(numbersQuery, operation) {
        if (!numbersQuery) {
            throw new common_1.BadRequestException('Debes enviar numbers. Ejemplo: ?numbers=2,3,4,5');
        }
        const numbers = numbersQuery.split(',').map((value) => Number(value));
        if (numbers.some((value) => Number.isNaN(value))) {
            throw new common_1.BadRequestException('Todos los valores en numbers deben ser numericos.');
        }
        return this.toolsService.calculateWithChild(numbers, operation);
    }
};
exports.ToolsController = ToolsController;
__decorate([
    (0, common_1.Get)('config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToolsController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Get)('process-info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToolsController.prototype, "getProcessInfo", null);
__decorate([
    (0, common_1.Get)('calculate'),
    __param(0, (0, common_1.Query)('numbers')),
    __param(1, (0, common_1.Query)('operation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ToolsController.prototype, "calculate", null);
exports.ToolsController = ToolsController = __decorate([
    (0, common_1.Controller)('tools'),
    __metadata("design:paramtypes", [tools_service_1.ToolsService])
], ToolsController);
//# sourceMappingURL=tools.controller.js.map