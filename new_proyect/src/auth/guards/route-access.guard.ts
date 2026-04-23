import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { TokenPayload } from '../auth.service';

interface RequestWithUser {
    originalUrl: string;
    user?: TokenPayload;
}

@Injectable()
export class RouteAccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('No hay usuario autenticado en la request.');
        }

        // admin puede entrar a cualquier ruta.
        if (user.role === 'admin') {
            return true;
        }

        // user solo puede entrar a rutas que comiencen con /api/user.
        if (request.originalUrl.startsWith('/api/user')) {
            return true;
        }

        throw new ForbiddenException('Tu rol no tiene permisos para esta ruta.');
    }
}
