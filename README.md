# BE3_77325

API backend construida con Node.js y Express. El proyecto expone endpoints de verificacion, rutas para probar distintos niveles de logging con Winston y una ruta que genera usuarios ficticios en memoria con Faker.

## Stack actual

- Node.js con ESM
- Express 5
- dotenv
- Winston
- @faker-js/faker
- Jest + Supertest
- Artillery
- Docker
- Kubernetes

## Estructura actual

```text
be3_77325/
├─ app.js
├─ Dockerfile
├─ docker-compose.yml
├─ deployment.yaml
├─ package.json
├─ .env
├─ src/
│  ├─ logs/
│  │  ├─ logger.js
│  │  └─ errors/
│  ├─ server/
│  │  └─ server.js
│  ├─ services/
│  │  └─ user.service.js
│  ├─ test/
│  │  ├─ app.test.js
│  │  ├─ user.test.js
│  │  ├─ users.service.stub.test.js
│  │  └─ artillery/
│  │     ├─ test.yml
│  │     └─ resultado.md
│  └─ teoria/
│     └─ teoria.md
└─ README.md
```

## Como funciona hoy

`app.js` solamente arranca el servidor definido en `src/server/server.js`.

El servidor:

- carga variables de entorno desde `.env`
- crea una API Express con soporte para JSON
- registra un middleware de auditoria para loguear cada request
- expone rutas de prueba para distintos niveles de log
- genera usuarios fake en memoria en `GET /users`

## Variables de entorno

El repo hoy incluye este archivo `.env`:

```env
PORT=5000
USERS_COUNT=30
NODE_ENV=production
LOG_LEVEL=info
```

Variables usadas por la aplicacion:

- `PORT`: puerto HTTP del servidor. Si no existe, usa `3000`.
- `USERS_COUNT`: cantidad de usuarios que devuelve `GET /users`. Si no existe, usa `5`.
- `NODE_ENV`: hoy se define en el entorno, pero no altera logica interna.
- `LOG_LEVEL`: hoy se define en entorno y manifests, pero el logger actual queda fijado en `debug`.

## Endpoints disponibles

### `GET /`

Devuelve estado basico del servidor y el PID del proceso:

```json
{
  "message": "Servidor funcionando correctamente",
  "pid": 12345
}
```

### `GET /debug`

Responde:

```text
Mensaje de Debug
```

### `GET /warn`

Responde:

```text
Mensaje de Advertencia
```

### `GET /error`

Responde:

```text
Mensaje de Error
```

### `GET /fatal`

Responde:

```text
Mensaje de Error Fatal
```

### `GET /test`

Responde:

```text
Mensaje de Test
```

### `GET /users`

Genera usuarios ficticios en memoria usando Faker. La cantidad depende de `USERS_COUNT`.

Ejemplo de respuesta:

```json
[
  {
    "id": "a8e3c8b2-1d8d-4d53-9d43-2d2f0f4d2e74",
    "name": "Juan Perez",
    "email": "juan@example.com"
  }
]
```

## Logging

El logger esta implementado con Winston y define niveles personalizados:

- `fatal`
- `error`
- `warn`
- `info`
- `http`
- `debug`

Los logs se escriben en consola y tambien en archivos dentro de `src/logs/errors/`:

- `combined.log`
- `errors.log`
- `fatals.log`
- `warnings.log`

## Ejecucion local

### Requisitos

- Node.js 18 o superior
- npm

### Instalar dependencias

```bash
npm install
```

### Iniciar la app

```bash
npm start
```

Con el `.env` actual, la aplicacion queda disponible en:

```text
http://localhost:5000
```

### Desarrollo con reinicio automatico

```bash
npm run dev
```

## Scripts disponibles

```json
{
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
  "start": "node app.js --env prod",
  "dev": "nodemon app.js --env local",
  "load:test": "artillery run src/test/artillery/test.yml"
}
```

## Testing

El proyecto incluye:

- tests unitarios para `generateFakerUsers`
- tests HTTP con Supertest
- prueba de carga con Artillery sobre `GET /test`

### Jest

```bash
npm test
```

Estado actual del repo:

- existe una suite que pasa: `src/test/users.service.stub.test.js`
- hoy `npm test` falla porque hay tests que intentan importar `../app` o `../app.js` desde `src/test`, pero ese modulo no existe en esa ubicacion actual del proyecto

### Artillery

```bash
npm run load:test
```

La configuracion actual en `src/test/artillery/test.yml` apunta a:

```text
http://localhost:5000/test
```

y ejecuta una fase de 10 segundos con `arrivalRate: 10`.

## Docker

### Build de imagen

```bash
docker build -t be3_77325:latest .
```

### Ejecutar con Docker Compose

```bash
docker compose up --build
```

Configuracion actual:

- imagen basada en `node:20-alpine`
- puerto expuesto `3000`
- volumen para persistir logs: `./src/logs:/app/src/logs`

Con `docker-compose.yml`, la app queda publicada en:

```text
http://localhost:3000
```

## Kubernetes

El archivo `deployment.yaml` incluye:

- un `Deployment` con 2 replicas
- un `Service` de tipo `ClusterIP`
- contenedor escuchando en puerto `3000`

Antes de desplegar, hay que reemplazar la imagen placeholder:

```text
tu-usuario/be3-77325:latest
```

Aplicacion:

```bash
kubectl apply -f deployment.yaml
```

## Estado actual del proyecto

El repo ya tiene:

- servidor Express funcional
- rutas de logging y diagnostico
- generacion de usuarios fake en memoria
- contenedorizacion con Docker
- manifiesto base para Kubernetes

Pendientes o inconsistencias actuales:

- los scripts `start` y `dev` siguen pasando `--env`, pero la app actual no procesa argumentos CLI
- `compression` y `commander` figuran en dependencias historicas, pero no se usan en el codigo actual
- la suite completa de Jest no esta verde

## Licencia

MIT
