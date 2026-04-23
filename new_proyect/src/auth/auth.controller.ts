import { BadRequestException, Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { FakeJwtGuard } from "./guards/fake-jwt.guard";
import { RouteAccessGuard } from "./guards/route-access.guard";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('auth/demo-token')
    getDemoToken(
        @Query('username') username = 'alejandro',
        @Query('role') role: 'admin' | 'user' = 'user',
    ) {
        if (role !== 'admin' && role !== 'user') {
            throw new BadRequestException('El role debe ser admin o user');
        }

        return {
            username,
            role,
            token: this.authService.generateDemoToken(username, role),
            howToUse: 'Enviar en authorization: Bearer <token>',
        }
    }

    @UseGuards(FakeJwtGuard, RouteAccessGuard)
    @Get('user/profile')
    getUserProfile() {
        return {
            message: `Ruta protegida para usuarios autenticados con roles`,
        };
    }

    @UseGuards(FakeJwtGuard, RouteAccessGuard)
    @Get('admin/dashboard')
    getAdminDashboard() {
        return {
            message: `Ruta protegida solo accesible para admin`,
        };
    }

}