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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
let FakeJwtGuard = class FakeJwtGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader || typeof authHeader !== 'string') {
            throw new common_1.UnauthorizedException('Falta el header Authorization.');
        }
        const [scheme, token] = authHeader.split(' ');
        if (scheme !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('El formato esperado es: Bearer <token>.');
        }
        const payload = this.authService.decodeToken(token);
        if (!payload) {
            throw new common_1.UnauthorizedException('El token es invalido.');
        }
        // Guardamos el usuario en request para que el siguiente guard pueda usarlo.
        request.user = payload;
        return true;
    }
};
exports.FakeJwtGuard = FakeJwtGuard;
exports.FakeJwtGuard = FakeJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], FakeJwtGuard);
//# sourceMappingURL=fake-jwt.guard.js.map