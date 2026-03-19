# Imagen base oficial de Node
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos primero los archivos de dependencias para aprovechar el cache de Docker
COPY package*.json ./

# Instalamos dependencias solamente necesarias para produccion
RUN npm ci --omit=dev

# Copiamos el resto del proyecto
COPY . .

# Creamos la carpeta de logs que usa Winston
RUN mkdir -p src/logs/errors

# Informamos el puerto en el que escucha la app dentro del contenedor
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando principal del contenedor
CMD [ "npm", "start" ]
