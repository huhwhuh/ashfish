# base stage
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm ci

# build stage
FROM base AS builder
COPY . .
RUN npm run build
RUN npm prune --production

# run stage
FROM node:20-alpine as prod
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
