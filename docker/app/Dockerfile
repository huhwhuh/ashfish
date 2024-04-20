# base stage. Contains all dev-dependencies
FROM node:20-alpine
FROM mcr.microsoft.com/playwright:v1.43.1-focal AS base
WORKDIR /app
COPY package*.json .
COPY svelte.config.js .
RUN npm ci

# test stage. Contains all source files
FROM base AS test
COPY . .

# Contains only production build output
FROM test AS build
RUN npm run build
RUN npm prune --production

# run stage. Contains only necessary files for running in production mode
FROM node:20-alpine as prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
CMD [ "node", "build" ]
