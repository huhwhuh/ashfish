# base stage
FROM node:20-alpine
FROM mcr.microsoft.com/playwright:focal
RUN npx -y playwright@1.43.0 install --with-deps

WORKDIR /app
COPY package*.json .
RUN npm ci

COPY . .
RUN npm run check