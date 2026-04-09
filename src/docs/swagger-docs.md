# Guía de Swagger para Estudiantes de CoderHouse

## ¿Qué es Swagger?

Swagger (OpenAPI) genera documentación automática de tu API a partir de comentarios JSDoc. Proporciona:

- UI interactiva para probar endpoints.
- Esquemas de request/response con ejemplos.
- Soporte para auth (JWT en este caso).

## Instalación (ya hecha)

```bash
npm install swagger-jsdoc swagger-ui-express
```

## Uso

1. Inicia el servidor: `npm run dev`
2. Abre <http://localhost:8000/api-docs> → UI interactiva.
3. Usa 'Try it out' para enviar requests reales con ejemplos prellenados.
4. Specs JSON: <http://localhost:8000/api-docs-json>

## Endpoints documentados

- GET /api/users/ : Lista usuarios.
- POST /api/users/ : Crear usuario (ejemplo en docs).
- POST /api/users/login : Obtener JWT token.
- GET /api/users/profile : Perfil (requiere Authorization: Bearer <token>).

## Personalización

Edita `swaggerOptions` en src/app.js para cambiar title, servers, schemas.
Agrega más @swagger en rutas/controladores.

¡Prueba los ejemplos para entender la API!
