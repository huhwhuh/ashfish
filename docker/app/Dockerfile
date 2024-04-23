# base stage. Contains all dev-dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json .
COPY *.config.js .
RUN npm ci

# Contains only production build output
FROM base AS build
COPY . .
RUN npm run build
RUN npm prune --production

# run stage. Contains only necessary files for running in production mode
FROM node:20-alpine as prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY package.json .
# The server will listen on environment variable $PORT by default
CMD [ "node", "build" ]
