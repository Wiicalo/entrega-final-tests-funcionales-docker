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
