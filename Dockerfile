FROM node:22-bookworm as builder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm@latest
RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22-bookworm
WORKDIR /app

COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/.env ./

EXPOSE 3000
CMD ["npm", "run", "start"]