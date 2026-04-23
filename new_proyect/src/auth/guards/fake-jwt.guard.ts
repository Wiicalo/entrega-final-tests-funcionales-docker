import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService, TokenPayload } from '../auth.service';

interface RequestWithUser {
    headers: Record<string, string | string[] | undefined>;
    user?: TokenPayload;
}

@Injectable()
export class FakeJwtGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const authHeader = request.headers.authorization;

        if (!authHeader || typeof authHeader !== 'string') {
            throw new UnauthorizedException('Falta el header Authorization.');
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            throw new UnauthorizedException('El formato esperado es: Bearer <token>.');
        }

        const payload = this.authService.decodeToken(token);

        if (!payload) {
            throw new UnauthorizedException('El token es invalido.');
        }

        // Guardamos el usuario en request para que el siguiente guard pueda usarlo.
        request.user = payload;

        return true;
    }
}
