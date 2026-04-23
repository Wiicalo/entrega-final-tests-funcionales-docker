import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from './auth.service';
import { FakeJwtGuard } from "./guards/fake-jwt.guard";
import { RouteAccessGuard } from "./guards/route-access.guard";

@Module({
    controllers: [AuthController],
    providers: [AuthService, FakeJwtGuard, RouteAccessGuard],
    exports: [AuthService, FakeJwtGuard, RouteAccessGuard],
})
export class AuthModule {}