# Clase 04

## 🧠 1. Introducción a Clusters y Escalabilidad

### ¿Qué es la escalabilidad?

La escalabilidad se refiere a la capacidad de una aplicación para manejar un aumento en la carga de trabajo sin comprometer su rendimiento. Esto se logra mediante la adición de recursos, como instancias adicionales del servidor.

### ¿Qué es un clúster?

Un clúster es un conjunto de máquinas (nodos) que trabajan juntas para ejecutar aplicaciones. En el contexto de contenedores, un clúster permite distribuir la carga de trabajo entre múltiples nodos, mejorando la disponibilidad y la tolerancia a fallos.

---

## 🐳 2. Contenedores con Docker

### ¿Qué es Docker?

Docker es una plataforma que permite empaquetar una aplicación y sus dependencias en un contenedor, asegurando que se ejecute de manera consistente en cualquier entorno.([es.wikipedia.org][1])

### Beneficios de Docker

* **Portabilidad**: Los contenedores pueden ejecutarse en cualquier sistema que tenga Docker instalado.
* **Aislamiento**: Cada contenedor opera de manera independiente, evitando conflictos entre aplicaciones.
* **Eficiencia**: Los contenedores son livianos y utilizan menos recursos que las máquinas virtuales.([es.wikipedia.org][1])

### Integración con tu servidor

Para contenerizar tu servidor Node.js:

1. **Crear un archivo `Dockerfile`** en la raíz del proyecto:

   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "run", "dev"]
   ```

2. **Construir la imagen**:

   ```bash
   docker build -t mi-servidor-node .
   ```

3. **Ejecutar el contenedor**:

   ```bash
   docker run -p 3000:3000 mi-servidor-node
   ```

---

## ☸️ 3. Orquestación de Contenedores con Kubernetes

### ¿Qué es Kubernetes?

Kubernetes es una plataforma de código abierto para la automatización del despliegue, escalado y gestión de aplicaciones en contenedores. ([es.wikipedia.org][2])

### Componentes clave

* **Pod**: Unidad básica que encapsula uno o más contenedores.
* **Deployment**: Gestiona la creación y actualización de Pods.
* **Service**: Expone una aplicación en ejecución en un conjunto de Pods como un servicio de red.([es.wikipedia.org][2])

### Desplegar tu servidor en Kubernetes

1. **Crear un archivo de despliegue `deployment.yaml`**:

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: mi-servidor
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: mi-servidor
     template:
       metadata:
         labels:
           app: mi-servidor
       spec:
         containers:
         - name: mi-servidor
           image: mi-servidor-node
           ports:
           - containerPort: 3000
   ```

2. **Aplicar el despliegue**:

   ```bash
   kubectl apply -f deployment.yaml
   ```

3. **Exponer el servicio**:

   ```bash
   kubectl expose deployment mi-servidor --type=LoadBalancer --port=3000
   ```

## Vamos a Analizar paso a paso

> Este archivo es una definición de **Deployment de Kubernetes**, escrita en YAML. Kubernetes usa este tipo de manifiestos para declarar el estado deseado de tus aplicaciones (contenedores) en el clúster.

---

### 📦 `apiVersion: apps/v1`

Define la versión de la API de Kubernetes que estás utilizando para este recurso.

* `apps/v1` es la versión más común para manejar Deployments.

---

### 🔖 `kind: Deployment`

Especifica el **tipo de recurso** que estás creando.

* En este caso, un `Deployment` que se usa para mantener actualizadas y disponibles varias réplicas de un contenedor.

---

### 🧾 `metadata`

Contiene información descriptiva sobre el recurso:

```yaml
metadata:
  name: mi-servidor
```

* `name`: nombre del Deployment (debe ser único en el namespace).

---

### ⚙️ `spec`

Define la **especificación del Deployment**, es decir, cómo debe comportarse:

---

#### 🧬 `replicas: 3`

Indica que querés **3 réplicas** (copias) del pod corriendo simultáneamente.

---

#### 🏷️ `selector`

Indica **cómo Kubernetes identifica qué pods pertenecen a este Deployment**. Debe coincidir con las etiquetas en el `template`.

```yaml
selector:
  matchLabels:
    app: mi-servidor
```

---

#### 📦 `template`

Plantilla del **Pod** que Kubernetes va a replicar.

```yaml
template:
  metadata:
    labels:
      app: mi-servidor
```

* Estas etiquetas deben coincidir con las del `selector`.

---

#### 🧪 `spec` (dentro del `template`)

Aquí definís **el contenido del Pod**, o sea, los contenedores que correrá:

```yaml
spec:
  containers:
  - name: mi-servidor
    image: mi-servidor-node
    ports:
    - containerPort: 3000
```

* `name`: nombre interno del contenedor.
* `image`: la imagen Docker que se usará.
* `ports`: define qué puerto está expuesto dentro del contenedor (`3000` en este caso).

---

### En resumen

Este archivo le dice a Kubernetes:
➡️ “Quiero 3 réplicas de un contenedor que use la imagen `mi-servidor-node` y escuche en el puerto 3000, identificadas con la etiqueta `app=mi-servidor`”.

---

## 🔐 4. Seguridad y Gestión de Imágenes en DockerHub

### ¿Qué es DockerHub?

DockerHub es un servicio de registro de contenedores que permite almacenar y compartir imágenes de Docker.&#x20;

### Publicar tu imagen en DockerHub

1. **Iniciar sesión en DockerHub**:

   ```bash
   docker login
   ```

2. **Etiquetar tu imagen**:

   ```bash
   docker tag mi-servidor-node tu_usuario/mi-servidor-node
   ```

3. **Subir la imagen**:

   ```bash
   docker push tu_usuario/mi-servidor-node
   ```

### Mejores prácticas de seguridad

* **Usar imágenes oficiales**: Reducen el riesgo de vulnerabilidades.
* **Escanear imágenes**: Utilizar herramientas como `docker scan` para identificar problemas de seguridad.
* **Mantener las imágenes actualizadas**: Aplicar actualizaciones de seguridad regularmente.([ackstorm.com][3])

---

## 📘 Material Teórico para la Clase

Para complementar la práctica, te recomiendo preparar una presentación que cubra:

* **Conceptos de contenedores y su importancia**.
* **Comparación entre máquinas virtuales y contenedores**.
* **Funcionamiento de Docker y sus componentes**.
* **Introducción a Kubernetes y su arquitectura**.
* **Casos de uso reales y beneficios de la orquestación de contenedores**.
* **Prácticas recomendadas para la seguridad en DockerHub**.

---

[1]: https://es.wikipedia.org/wiki/Docker_%28software%29?utm_source=chatgpt.com "Docker (software)"
[2]: https://es.wikipedia.org/wiki/Kubernetes?utm_source=chatgpt.com "Kubernetes"
[3]: https://www.ackstorm.com/blog/diferencias-entre-docker-vs-kubernetes/?utm_source=chatgpt.com "Diferencias entre Docker y Kubernetes - ACKstorm"
