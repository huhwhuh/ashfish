# base stage
FROM node:20-alpine
FROM mcr.microsoft.com/playwright:focal AS base

WORKDIR /app
COPY package*.json .
COPY svelte.config.js .
RUN npm ci

FROM base AS test
ENV FORCE_COLOR=true
COPY . .