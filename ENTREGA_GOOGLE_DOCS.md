# Entrega final - Tests funcionales y Docker

## Estructura del proyecto

El proyecto esta organizado por responsabilidades. Las rutas estan separadas de los controladores, la logica principal queda en servicios y los datos de prueba se manejan con repositorios en memoria para no depender de una base de datos externa durante los tests.

```text
.
|-- Dockerfile
|-- README.md
|-- app.js
|-- docker-compose.yml
|-- package.json
|-- src
|   |-- controllers
|   |   |-- adoptions.controller.js
|   |   `-- user.controller.js
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
|   |-- services
|   |   |-- adoption.service.js
|   |   `-- user.service.js
|   `-- test
|       |-- adoption.route.test.js
|       |-- user.route.test.js
|       `-- user.service.test.js
`-- new_proyect
```

Descripcion de carpetas:

- `src/routes`: define los endpoints disponibles de la API.
- `src/controllers`: recibe las peticiones y arma las respuestas HTTP.
- `src/services`: contiene la logica principal del proyecto.
- `src/repositories`: maneja los datos usados por la aplicacion y las pruebas.
- `src/models`: define la forma de los objetos principales.
- `src/test`: contiene las pruebas funcionales y unitarias.
- `new_proyect`: carpeta incluida en el repositorio original, sin cambios para esta entrega.

## Tests funcionales

Codigo completo de `src/test/adoption.route.test.js`:

```js
import request from 'supertest';
import { expect } from 'chai';
import app from '../../app.js';
import { resetAdoptions, failNextAdoptionRepositoryCall } from '../repositories/adoption.repository.js';
import { resetAdoptionUsers } from '../repositories/adoption-user.repository.js';
import { resetPets } from '../repositories/pet.repository.js';

describe('Adoption Routes - Functional', () => {
    beforeEach(() => {
        resetAdoptionUsers([
            { id: 'user-1', username: 'sofi', pets: [] },
            { id: 'user-2', username: 'nico', pets: ['pet-adopted'] }
        ]);

        resetPets([
            { id: 'pet-1', name: 'Mora', specie: 'dog', adopted: false },
            { id: 'pet-adopted', name: 'Nube', specie: 'cat', adopted: true, owner: 'user-2' }
        ]);

        resetAdoptions([
            { id: 'adoption-1', owner: 'user-2', pet: 'pet-adopted' }
        ]);
    });

    it('GET /api/adoptions responde todas las adopciones', async () => {
        const res = await request(app).get('/api/adoptions');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.payload).to.be.an('array').with.lengthOf(1);
        expect(res.body.payload[0]).to.include({ id: 'adoption-1', owner: 'user-2', pet: 'pet-adopted' });
    });

    it('GET /api/adoptions/:aid responde una adopcion existente', async () => {
        const res = await request(app).get('/api/adoptions/adoption-1');

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.payload).to.include({ id: 'adoption-1', owner: 'user-2', pet: 'pet-adopted' });
    });

    it('GET /api/adoptions/:aid responde 404 cuando no existe', async () => {
        const res = await request(app).get('/api/adoptions/adoption-404');

        expect(res.status).to.equal(404);
        expect(res.body).to.deep.equal({ status: 'error', error: 'Adoption not found' });
    });

    it('GET /api/adoptions/:aid valida formato de id', async () => {
        const res = await request(app).get('/api/adoptions/@@@');

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status', 'error');
        expect(res.body.errors[0]).to.have.property('msg', 'Invalid adoption id');
    });

    it('POST /api/adoptions/:uid/:pid crea una adopcion valida', async () => {
        const res = await request(app).post('/api/adoptions/user-1/pet-1');

        expect(res.status).to.equal(200);
        expect(res.body).to.include({ status: 'success', message: 'Pet adopted' });
        expect(res.body.payload).to.include({ owner: 'user-1', pet: 'pet-1' });

        const list = await request(app).get('/api/adoptions');
        expect(list.body.payload).to.have.lengthOf(2);
        expect(list.body.payload.at(-1)).to.include({ owner: 'user-1', pet: 'pet-1' });
    });

    it('POST /api/adoptions/:uid/:pid responde 404 si el usuario no existe', async () => {
        const res = await request(app).post('/api/adoptions/user-404/pet-1');

        expect(res.status).to.equal(404);
        expect(res.body).to.deep.equal({ status: 'error', error: 'user Not found' });
    });

    it('POST /api/adoptions/:uid/:pid responde 404 si la mascota no existe', async () => {
        const res = await request(app).post('/api/adoptions/user-1/pet-404');

        expect(res.status).to.equal(404);
        expect(res.body).to.deep.equal({ status: 'error', error: 'Pet not found' });
    });

    it('POST /api/adoptions/:uid/:pid responde 400 si la mascota ya fue adoptada', async () => {
        const res = await request(app).post('/api/adoptions/user-1/pet-adopted');

        expect(res.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 'error', error: 'Pet is already adopted' });
    });

    it('POST /api/adoptions/:uid/:pid valida parametros', async () => {
        const res = await request(app).post('/api/adoptions/x/@@@');

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('status', 'error');
        expect(res.body.errors.map(error => error.msg)).to.include.members([
            'Invalid user id',
            'Invalid pet id'
        ]);
    });

    it('GET /api/adoptions responde 500 ante una falla del repositorio', async () => {
        failNextAdoptionRepositoryCall('findAll');

        const res = await request(app).get('/api/adoptions');

        expect(res.status).to.equal(500);
        expect(res.body).to.include({ status: 'error', error: 'Internal server error' });
        expect(res.body.detail).to.include('Adoption repository findAll error');
    });
});
```

Explicacion de los tests:

- `GET /api/adoptions`: comprueba que el endpoint devuelva el listado de adopciones.
- `GET /api/adoptions/:aid`: comprueba busqueda exitosa, error 404 e id invalido.
- `POST /api/adoptions/:uid/:pid`: comprueba adopcion correcta y casos de error: usuario inexistente, mascota inexistente, mascota ya adoptada y parametros invalidos.
- Error interno: se fuerza un error del repositorio para revisar la respuesta 500.

Evidencia de ejecucion:

```text
> npm test

Adoption Routes - Functional
  ✔ GET /api/adoptions responde todas las adopciones
  ✔ GET /api/adoptions/:aid responde una adopcion existente
  ✔ GET /api/adoptions/:aid responde 404 cuando no existe
  ✔ GET /api/adoptions/:aid valida formato de id
  ✔ POST /api/adoptions/:uid/:pid crea una adopcion valida
  ✔ POST /api/adoptions/:uid/:pid responde 404 si el usuario no existe
  ✔ POST /api/adoptions/:uid/:pid responde 404 si la mascota no existe
  ✔ POST /api/adoptions/:uid/:pid responde 400 si la mascota ya fue adoptada
  ✔ POST /api/adoptions/:uid/:pid valida parametros
  ✔ GET /api/adoptions responde 500 ante una falla del repositorio

User Routes - Integrations
  ✔ GET /api/users responde un Array con codigo 200
  ✔ POST /api/users crea un usuario
  ✔ POST /api/users/login retorna un token y un user
  ✔ GET /api/users/profile responde responde un 401 sin token
  ✔ GET /api/users/profile responde responde un 200 con token valido

User Service - Unit
  ✔ retorna todos los usuarios en un Array
  ✔ lanza error si el email ya existe
  ✔ lanza error si el username ya existe
  ✔ retorna el token y el user al hacer login
  ✔ lanza error cuando el password es incorrecto
  ✔ lanza error cuando el email es incorrecto

21 passing (3s)
```

## Dockerizacion

Contenido del Dockerfile:

```dockerfile
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit:dev
RUN npm cache clean --force

FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5050

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=node:node package*.json ./
COPY --chown=node:node app.js ./
COPY --chown=node:node src ./src

RUN mkdir -p src/logs/errors && chown -R node:node /app

USER node

EXPOSE 5050

CMD [ "npm", "start" ]
```

Decisiones tomadas:

- `node:22-alpine`: imagen liviana para ejecutar la API.
- `npm ci --omit=dev`: instala solo dependencias de produccion.
- Build en dos etapas: mantiene separada la instalacion de dependencias.
- `.dockerignore`: evita copiar archivos innecesarios al contexto.
- `USER node`: la aplicacion no corre como root.

## Imagen Docker

Nombre y tag:

```text
wiicalo/be3_77325-adoptions:1.0.0
```

Comando de build:

```bash
docker build -t wiicalo/be3_77325-adoptions:1.0.0 .
```

Comando de ejecucion:

```bash
docker run --name be3-adoptions -p 5050:5050 --env PORT=5050 wiicalo/be3_77325-adoptions:1.0.0
```

Subida a DockerHub:

```bash
docker login
docker push wiicalo/be3_77325-adoptions:1.0.0
```

Escaneo basico:

```text
> npm audit --omit=dev --audit-level=moderate
found 0 vulnerabilities
```

## Ejecucion del proyecto

Instalar dependencias:

```bash
npm ci
```

Correr tests:

```bash
npm test
```

Construir imagen:

```bash
docker build -t wiicalo/be3_77325-adoptions:1.0.0 .
```

Ejecutar contenedor:

```bash
docker run --name be3-adoptions -p 5050:5050 --env PORT=5050 wiicalo/be3_77325-adoptions:1.0.0
```

Probar endpoint:

```bash
curl http://localhost:5050/api/adoptions
```

## README

El README actualizado contiene los links, comandos de instalacion, comandos Docker, ejecucion de tests y estructura del proyecto.
