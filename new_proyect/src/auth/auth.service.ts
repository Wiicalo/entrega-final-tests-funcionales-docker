import { Injectable } from "@nestjs/common";

export type AllowedRole = 'admin' | 'user';

export interface TokenPayload {
    username: string;
    role: AllowedRole;
}

@Injectable()
export class AuthService {
    decodeToken(token: string): TokenPayload | null {
        try {
            const rawJson = Buffer.from(token, 'base64').toString('utf-8');
            const parsed = JSON.parse(rawJson) as Partial<TokenPayload>;

            if (typeof parsed.username !== 'string' || parsed.username.trim() === '') {
                return null;
            }

            if (parsed.role !== 'admin' && parsed.role !== 'user') {
                return null;
            }

            return {
                username: parsed.username,
                role: parsed.role,
            }

        } catch {
            return null;
        }
    }

    validateToken(token: string): boolean {
        return this.decodeToken(token) !== null;
    }

    guardToken(token: string, route: string): boolean {
        const payload = this.decodeToken(token);

        if (!payload) {
            return false;
        }

        if (payload.role === 'admin') {
            return true;
        }

        return route.startsWith('/user')
    }

    generateDemoToken(username: string, role: AllowedRole): string {
        return Buffer.from(JSON.stringify({ username, role }), 'utf-8').toString('base64');
    }
}