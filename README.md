# BE3_77325 - Tests funcionales y Docker

Proyecto backend en Express con pruebas funcionales para el router de adopciones y configuracion Docker para ejecutar la API en contenedor.

## Links

- Repositorio: `https://github.com/Wiicalo/be3_77325-adoptions`
- Imagen DockerHub: `https://hub.docker.com/r/wiicalo/be3_77325-adoptions`
- Imagen: `wiicalo/be3_77325-adoptions:1.0.0`

## Requisitos

- Node.js 20 o superior
- npm
- Docker Desktop

## Instalacion

```bash
npm ci
```

## Ejecutar la API

```bash
npm start
```

Por defecto se levanta en:

```text
http://localhost:3000
```

Tambien se puede indicar un puerto:

```bash
PORT=5050 npm start
```

## Endpoints

Adopciones:

- `GET /api/adoptions`
- `GET /api/adoptions/:aid`
- `POST /api/adoptions/:uid/:pid`

Usuarios:

- `GET /api/users/`
- `POST /api/users/`
- `POST /api/users/login`
- `GET /api/users/profile`

## Tests

Los tests funcionales de adopciones estan en:

```text
src/test/adoption.route.test.js
```

Casos cubiertos:

- listado de adopciones
- busqueda por id
- adopcion inexistente
- validacion de parametros
- creacion de adopcion
- usuario inexistente
- mascota inexistente
- mascota ya adoptada
- error del repositorio

Ejecutar:

```bash
npm test
```

Resultado:

```text
21 passing (3s)
```

## Docker

Construir la imagen:

```bash
docker build -t wiicalo/be3_77325-adoptions:1.0.0 .
```

Ejecutar el contenedor:

```bash
docker run --name be3-adoptions -p 5050:5050 --env PORT=5050 wiicalo/be3_77325-adoptions:1.0.0
```

Probar el endpoint:

```bash
curl http://localhost:5050/api/adoptions
```

Subir la imagen:

```bash
docker login
docker push wiicalo/be3_77325-adoptions:1.0.0
```

Escaneo basico:

```bash
npm audit --omit=dev --audit-level=moderate
```

Resultado:

```text
found 0 vulnerabilities
```

## Dockerfile

El Dockerfile usa `node:22-alpine`, instala dependencias con `npm ci --omit=dev` y ejecuta la aplicacion con el usuario `node`. Tambien se usa `.dockerignore` para no copiar dependencias locales, logs, `.git` ni archivos de test al contenedor.

## Estructura

```text
.
|-- Dockerfile
|-- README.md
|-- app.js
|-- docker-compose.yml
|-- package.json
|-- src
|   |-- config
|   |-- controllers
|   |   |-- adoptions.controller.js
|   |   `-- user.controller.js
|   |-- docs
|   |-- middleware
|   |-- models
|   |   |-- adoption.model.js
|   |   |-- pet.model.js
|   |   `-- user.model.js
|   |-- repositories
|   |   |-- adoption-user.repository.js
|   |   |-- adoption.repository.js
|   |   |-- pet.repository.js
|   |   `-- user.repository.js
|   |-- routes
|   |   |-- adoption.router.js
|   |   `-- user.router.js
|   |-- server
|   |-- services
|   |   |-- adoption.service.js
|   |   `-- user.service.js
|   `-- test
|       |-- adoption.route.test.js
|       |-- user.route.test.js
|       `-- user.service.test.js
```
