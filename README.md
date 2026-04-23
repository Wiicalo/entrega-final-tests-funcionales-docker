# BE3_77325

API backend construida con Node.js y Express. El proyecto expone endpoints de verificacion, rutas para probar distintos niveles de logging con Winston y una ruta que genera usuarios ficticios en memoria con Faker.

## Estructura actual

```text
new_proyect/
|-- scripts/
|   `-- calc-child.js
|-- src/
|   |-- auth/
|   |   |-- guards/
|   |   |   |-- fake-jwt.guard.ts
|   |   |   `-- route-access.guard.ts
|   |   |-- auth.controller.ts
|   |   |-- auth.module.ts
|   |   `-- auth.service.ts
|   |-- tools/
|   |   |-- tools.controller.ts
|   |   |-- tools.module.ts
|   |   `-- tools.service.ts
|   |-- app.controller.ts
|   |-- app.module.ts
|   `-- main.ts
|-- .env.example
|-- package.json
└─ tsconfig.json
```
