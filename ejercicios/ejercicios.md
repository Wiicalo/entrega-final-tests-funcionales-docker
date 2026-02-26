# **Listado de ejercicios prácticos**

> Este archivo está pensado para ustedes (alumnos) como guía de práctica.
> Recomendación de avance: `process` -> `.env` -> `commander` -> `express` -> `child_process` -> integrador.

---

## 🧪 **Temario a practicar**

1. `process` en Node.js
2. Variables de entorno con `.env` + `dotenv`
3. Argumentos de consola con `commander`
4. Servidor básico con `express`
5. `child_process` (procesos hijo)
6. Integración de todos los temas

---

## ✅ **Antes de empezar (importante)**

- Practiquen de a un tema por vez.
- No arranquen por el integrador.
- Si algo no sale, prueben con logs (`console.log`) y lean el error completo.
- Cuando un ejercicio diga "mostrar", intenten mostrarlo de forma clara (texto o JSON).

---

## ✅ **Listado de ejercicios propuestos (mejorado)**

### 1. 🔍 **Explorar el objeto `process`**

**Objetivo:** Entender qué información ofrece Node sobre el proceso actual.

- **Ejercicio 1.1:** Crear un script que imprima:
  - `process.cwd()`
  - `process.execPath`
  - `process.platform`
  - `process.argv`
  - `process.pid`

- **Ejercicio 1.2:** Mostrar solo los argumentos enviados por el usuario (`process.argv.slice(2)`).

- **Ejercicio 1.3:** Crear un script que reciba un nombre por consola y salude.
  - Ejemplo: `node saludo.js Juan` -> `Hola Juan`

- **Ejercicio 1.4 (extra):** Mostrar cuánto tiempo lleva corriendo el proceso con `process.uptime()`.

---

### 2. 🌱 **Manejo de variables de entorno (`.env`)**

**Objetivo:** Cargar configuración externa y usarla desde `process.env`.

- **Ejercicio 2.1:** Crear `.env.dev` con variables como `PORT`, `SECRETO`, `MODO`.
  Luego, cargarlo con `dotenv` y mostrar los valores por consola.

- **Ejercicio 2.2:** Crear `.env.prod` con valores distintos y comprobar que cambian al cargar ese archivo.

- **Ejercicio 2.3:** Imprimir un mensaje distinto según `process.env.MODO`:
  - `dev` -> "Modo desarrollo"
  - `prod` -> "Modo producción"

- **Ejercicio 2.4:** Si falta una variable (por ejemplo `SECRETO`), usar un valor por defecto.
  - Ejemplo: `process.env.SECRETO || "valor por defecto"`

- **Ejercicio 2.5 (buena práctica):** Validar que el archivo `.env` exista antes de cargarlo.

---

### 3. 🔄 **Usar `commander` para leer argumentos**

**Objetivo:** Pasar opciones por CLI de forma clara y legible.

- **Ejercicio 3.1:** Definir una opción `--env <tipo>` para elegir el entorno (`dev` / `prod`).

- **Ejercicio 3.2:** Usar `--env` para cargar `.env.dev` o `.env.prod`.

- **Ejercicio 3.3:** Agregar una opción booleana `--debug` para mostrar logs extra.
  - Ejemplo: mostrar qué archivo `.env` se cargó.

- **Ejercicio 3.4:** Validar que `--env` solo acepte `dev` o `prod`.
  - Si llega otro valor, mostrar error claro y terminar el programa.

- **Ejercicio 3.5 (extra):** Agregar `--port <numero>` para sobreescribir el puerto del `.env`.

---

### 4. 🌐 **Servidor básico con `express`**

**Objetivo:** Crear endpoints simples y devolver respuestas.

- **Ejercicio 4.1:** Crear un servidor Express con endpoint `GET /` que responda `"Servidor OK"`.

- **Ejercicio 4.2:** Crear endpoint `GET /info` que devuelva en JSON:
  - `pid`
  - `platform`
  - `version`
  - `cwd`
  - `argv`

- **Ejercicio 4.3:** Crear endpoint `GET /secreto` que muestre `process.env.SECRETO` (solo con fines didácticos).

- **Ejercicio 4.4 (extra):** Crear endpoint `GET /saludar/:nombre` que responda `Hola <nombre>`.

---

### 5. 👶 **Child process en Node**

**Objetivo:** Ejecutar tareas en procesos secundarios y comunicar padre/hijo.

- **Ejercicio 5.1 (simple primero):** Crear `child.js` que envíe un mensaje al padre con `process.send("Hola desde el hijo")`.

- **Ejercicio 5.2:** Crear endpoint `/child` en Express que haga `fork('child.js')` y devuelva el mensaje del hijo.

- **Ejercicio 5.3:** Manejar eventos del hijo:
  - `message`
  - `error`
  - `exit`

- **Ejercicio 5.4 (importante - comunicación bidireccional):**
  - El **padre** debe enviar un número al hijo usando `child.send(...)`
  - El **hijo** debe recibirlo con `process.on("message", ...)`
  - El hijo lo multiplica por 2 y responde con `process.send(...)`

- **Ejercicio 5.5 (avanzado):** Crear `pesado.js` que haga una tarea intensiva (ej: contar hasta `1e8`) y medir cuánto tarda.

- **Ejercicio 5.6 (avanzado):** Crear endpoint `/pesado` que ejecute `pesado.js` con `fork()` y devuelva el resultado sin bloquear el servidor principal.

---

### 6. 🛠 **Integrador práctico**

**Objetivo:** Unir todos los conceptos en una sola aplicación funcional.

- **Ejercicio 6.1:** Crear un servidor Express que:
  - Use variables de entorno desde `.env.<modo>`
  - Permita elegir entorno con `--env`
  - Tenga `--debug` opcional
  - Tenga endpoint `/info` con datos de `process`
  - Tenga endpoint `/secreto` para comprobar `.env`
  - Tenga endpoint `/child` que use `fork()`

- **Ejercicio 6.2 (mejora):** Si el archivo `.env.<modo>` no existe, mostrar error y finalizar con `process.exit(1)`.

- **Ejercicio 6.3 (mejora):** Agregar logs más claros:
  - puerto
  - entorno cargado
  - archivo `.env` usado

- **Ejercicio 6.4 (extra):** Agregar endpoint `/calc/:n` que envíe `n` al proceso hijo y devuelva `n * 2`.

---

### 🧩 **BONUS (para alumnos avanzados)**

- **Bonus 1:** Crear un CLI con `commander` que tenga subcomandos:
  - `info`
  - `run-child`
  - `server --env dev`

- **Bonus 2:** Probar `child_process.spawn()` y comparar con `fork()`.
  - ¿Cuál conviene para scripts de Node?
  - ¿Cuál conviene para ejecutar comandos del sistema?

- **Bonus 3:** Usar el módulo `os` para mostrar:
  - `os.platform()`
  - `os.cpus().length`
  - `os.totalmem()`

- **Bonus 4:** Agregar manejo de señales del proceso:
  - `process.on("SIGINT", ...)`
  - Mostrar mensaje al cerrar con `Ctrl + C`

---

## 📝 **Checklist de comprensión (para autoevaluarse)**

Antes de pasar al siguiente tema, intenten responder:

- ¿Puedo explicar qué es `process.argv` y qué hay en cada índice?
- ¿Entiendo para qué sirve `process.env`?
- ¿Sé por qué usamos `dotenv`?
- ¿Sé qué ventaja da `commander` frente a leer `argv` manualmente?
- ¿Puedo explicar qué hace `fork()`?
- ¿Entiendo quién usa `child.send(...)` y quién usa `process.send(...)`?

Si alguna respuesta es "no", vuelvan a ese ejercicio antes de seguir.

---

## 💡 **Sugerencia para clase / práctica grupal**

- Resolver primero los ejercicios 1 a 4 entre todos.
- Dejar `child_process` para cuando ya esté firme Express.
- Hacer el integrador en parejas:
  - una persona arma configuración/CLI
  - la otra arma endpoints y proceso hijo

---

## 🧑‍🏫 Profesor  

👨‍💻 **Alejandro Daniel Di Stefano**  
📌 **Desarrollador Full Stack**  
🔗 **GitHub:** [Drako01](https://github.com/Drako01)  
