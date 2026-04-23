import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ToolsModule } from './tools/tools.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        ToolsModule,
    ],
    controllers: [AppController],
})

export class AppModule {}