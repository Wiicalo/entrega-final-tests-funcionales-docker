import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    getHome() {
        return {
            message: `Demo simple de NestJS para Clase 07 de CoderHouse`,
            routes: {
                publicDemoToken: '/api/auth/demo-token?username=alejandro&role=admin',
                userRoute: '/api/user/profile',
                adminRoute: '/api/admin/dashboard',
                envInfo: '/api/tools/config',
                processInfo: '/api/tools/process-info',
                childProcess: '/api/tools/calculate?numbers=2,3,4',
            },
        };
    }
}