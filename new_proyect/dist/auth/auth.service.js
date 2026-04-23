"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    decodeToken(token) {
        try {
            const rawJson = Buffer.from(token, 'base64').toString('utf-8');
            const parsed = JSON.parse(rawJson);
            if (typeof parsed.username !== 'string' || parsed.username.trim() === '') {
                return null;
            }
            if (parsed.role !== 'admin' && parsed.role !== 'user') {
                return null;
            }
            return {
                username: parsed.username,
                role: parsed.role,
            };
        }
        catch {
            return null;
        }
    }
    validateToken(token) {
        return this.decodeToken(token) !== null;
    }
    guardToken(token, route) {
        const payload = this.decodeToken(token);
        if (!payload) {
            return false;
        }
        if (payload.role === 'admin') {
            return true;
        }
        return route.startsWith('/user');
    }
    generateDemoToken(username, role) {
        return Buffer.from(JSON.stringify({ username, role }), 'utf-8').toString('base64');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map