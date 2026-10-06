FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
ENV DATA_DIR=/data
COPY --from=build /app/dist ./dist
COPY server/once.mjs ./server/once.mjs
EXPOSE 80
CMD ["node", "server/once.mjs"]
