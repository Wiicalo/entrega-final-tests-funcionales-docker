# Imagen base de node para que Render pueda utilizar en el deploy
FROM node:22-alpine

WORKDIR /app


COPY package*.json ./

# En produccion instalamos solo dependencias que no sean devDependencies
RUN npm ci --omit:dev

COPY . .


RUN mkdir -p src/logs/errors

# El contenedor expone el puerto interno, Render lo inyecta en runtime
EXPOSE 5050


ENV NODE_ENV=production
ENV PORT=5050

CMD [ "npm", "start" ]