"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteAccessGuard = void 0;
const common_1 = require("@nestjs/common");
let RouteAccessGuard = class RouteAccessGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('No hay usuario autenticado en la request.');
        }
        // admin puede entrar a cualquier ruta.
        if (user.role === 'admin') {
            return true;
        }
        // user solo puede entrar a rutas que comiencen con /api/user.
        if (request.originalUrl.startsWith('/api/user')) {
            return true;
        }
        throw new common_1.ForbiddenException('Tu rol no tiene permisos para esta ruta.');
    }
};
exports.RouteAccessGuard = RouteAccessGuard;
exports.RouteAccessGuard = RouteAccessGuard = __decorate([
    (0, common_1.Injectable)()
], RouteAccessGuard);
//# sourceMappingURL=route-access.guard.js.map