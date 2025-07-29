FROM node:22-bookworm as builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma

RUN npm ci --include=dev
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app

COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]