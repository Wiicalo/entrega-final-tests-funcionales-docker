# BE3_77325

Proyecto simple en NestJS para practicar dos bloques:

- autenticacion y autorizacion con un token simulado
- variables de entorno, `process.argv` y `child_process`

La aplicacion esta dentro de la carpeta [new_proyect](./new_proyect).

## Requisitos

- Node.js 20 o superior
- npm

## Clonar e instalar

```bash
git clone <URL_DEL_REPOSITORIO>
cd be3_77325/new_proyect
npm install
```

## Configuracion

Crear el archivo `.env` a partir de `.env.example`.

### PowerShell

```powershell
Copy-Item .env.example .env
```

### Git Bash / Linux / macOS

```bash
cp .env.example .env
```

Contenido esperado:

```env
PORT=5000
APP_NAME="Clase 07 NestJS Demo"
OPERATION=sum
```

Variables:

- `PORT`: puerto del servidor
- `APP_NAME`: nombre visible de la app
- `OPERATION`: operacion por defecto del proceso hijo. Puede ser `sum` o `multiply`

## Ejecutar el proyecto

### Modo desarrollo

```bash
npm run start
```

### Compilar

```bash
npm run build
```

La API queda disponible en:

```text
http://localhost:5000/api
```

Si cambias `PORT` en `.env`, cambia tambien la URL.

## Que hace el proyecto

### 1. Autenticacion y autorizacion

El proyecto no usa JWT real firmado. Usa un token simple en base64 que representa un JSON como este:

```json
{ "username": "alice", "role": "admin" }
```

Hay dos guards:

- `FakeJwtGuard`: valida el token y deja el usuario autenticado en la request
- `RouteAccessGuard`: revisa si el rol puede entrar a la ruta pedida

Reglas:

- `admin`: puede entrar a todas las rutas
- `user`: solo puede entrar a rutas que empiecen con `/api/user`

### 2. Herramientas de Node.js

La parte `tools` muestra tres conceptos:

- `process.env`
- `process.argv`
- `child_process`

El endpoint de calculo no resuelve la operacion en el proceso principal. Lanza un proceso hijo y le pasa los numeros por argumentos.

## Endpoints principales

### `GET /api`

Muestra una respuesta simple con las rutas principales del proyecto.

### `GET /api/auth/demo-token?username=alice&role=admin`

Genera un token de prueba para usar en rutas protegidas.

### `GET /api/user/profile`

Ruta protegida. Acepta token con rol `user` o `admin`.

### `GET /api/admin/dashboard`

Ruta protegida. Solo acepta token con rol `admin`.

### `GET /api/tools/config`

Devuelve la configuracion principal tomada desde variables de entorno.

### `GET /api/tools/process-info`

Devuelve informacion del proceso actual:

- `pid`
- `nodeVersion`
- `argv`

### `GET /api/tools/calculate?numbers=2,3,4`

Ejecuta el proceso hijo y devuelve el resultado usando la operacion definida en `.env`.

### `GET /api/tools/calculate?numbers=2,3,4,5,9,12&operation=mul`

Ejecuta el proceso hijo y fuerza multiplicacion para esa request.

Valores aceptados para `operation`:

- `sum`
- `mul`
- `multiply`

## Como probar la autenticacion

### 1. Obtener un token

Abrir:

```text
http://localhost:5000/api/auth/demo-token?username=bob&role=user
```

Copiar el valor `token`.

### 2. Usarlo en una ruta protegida

Hacer una request a:

```text
GET http://localhost:5000/api/user/profile
```

Con este header:

```text
Authorization: Bearer TU_TOKEN
```

### 3. Probar permisos

Con token `user`:

- `/api/user/profile` -> permitido
- `/api/admin/dashboard` -> rechazado

Con token `admin`:

- `/api/user/profile` -> permitido
- `/api/admin/dashboard` -> permitido

## Como probar el calculo

### Suma

```text
http://localhost:5000/api/tools/calculate?numbers=2,3,4
```

### Multiplicacion

```text
http://localhost:5000/api/tools/calculate?numbers=2,3,4,5,9,12&operation=mul
```

Si quieres que la operacion por defecto sea multiplicacion, cambia el `.env` a:

```env
OPERATION=multiply
```

## Estructura del proyecto

```text
be3_77325/
|-- new_proyect/
|   |-- scripts/
|   |   `-- calc-child.js
|   |-- src/
|   |   |-- auth/
|   |   |   |-- guards/
|   |   |   |   |-- fake-jwt.guard.ts
|   |   |   |   `-- route-access.guard.ts
|   |   |   |-- auth.controller.ts
|   |   |   |-- auth.module.ts
|   |   |   `-- auth.service.ts
|   |   |-- tools/
|   |   |   |-- tools.controller.ts
|   |   |   |-- tools.module.ts
|   |   |   `-- tools.service.ts
|   |   |-- app.controller.ts
|   |   |-- app.module.ts
|   |   `-- main.ts
|   |-- .env.example
|   |-- package.json
|   `-- tsconfig.json
|-- LICENCE
`-- README.md
```
