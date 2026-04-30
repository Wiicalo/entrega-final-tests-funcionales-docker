import express from 'express';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import logger from '../config/logger.js';
import userRoutes from '../routes/user.router.js';

dotenv.config();

const app = express();

// Swagger config con ejemplos
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Usuarios CoderHouse',
            version: '1.0.0',
            description: 'Ejemplos JWT. Puerto 8000. Rutas públicas + auth.'
        },
        servers: [{ url: 'http://localhost:8000' }, { url: 'http://localhost:3000' }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '1' },
                        username: { type: 'string', example: 'Juan Pérez' },
                        email: { type: 'string', example: 'juan@example.com' }
                    }
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
                        user: { $ref: '#/components/schemas/User' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Error desc' }
                    }
                },
                Error401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Error 401' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    swaggerOptions: {
        docExpansion: 'none',
        persistAuthorization: false
    }
}));


app.use(express.json());

// Middleware general de auditoria
app.use((req, res, next) => {
    logger.http(`Solicitud entrante: ${req.method} | URL: ${req.url}`);
    next();
})

app.use('/api/users', userRoutes);

const rawPort = process.env.PORT;
const PORT = rawPort ? Number(rawPort) : 3000;

if (Number.isNaN(PORT)) {
    logger.error(`PORT invalido en ${envFilePath}; "${rawPort}"`)
}


export function startServer() {
    app.listen(PORT, () => { logger.info(`Escuchando en http://localhost:${PORT}`) });
};