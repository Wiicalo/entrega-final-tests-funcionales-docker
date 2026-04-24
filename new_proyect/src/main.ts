import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const port = Number(process.env.PORT) || 5000;
    await app.listen(port);

    console.log(`Servidor NestJS escuchando en http://localhost:${port}/api`);
}

bootstrap();
