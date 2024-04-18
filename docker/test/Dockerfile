# base stage
FROM node:20-alpine
FROM mcr.microsoft.com/playwright:focal

WORKDIR /app
COPY package*.json .
RUN npm ci
RUN npx -y playwright@1.43.1 install --with-deps

COPY . .
RUN npm run check