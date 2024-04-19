# base stage. Contains all dev-dependencies
FROM node:20-alpine
FROM mcr.microsoft.com/playwright:v1.43.1-focal AS base
WORKDIR /app
COPY package*.json .
COPY svelte.config.js .
RUN npm ci

# build stage. Contains all source files and compiled output
FROM base AS test
COPY . .

FROM test AS build
RUN npm run build

# run stage. Contains only necessary files for running in production mode
FROM node:20-alpine as prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
RUN npm prune --production
COPY package.json .
EXPOSE 3000
CMD [ "node", "build" ]
