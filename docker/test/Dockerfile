# base stage
FROM mcr.microsoft.com/playwright:focal AS base

WORKDIR /app
COPY package*.json .
COPY *.config.js .
RUN npm ci

FROM base AS test
ENV FORCE_COLOR=true
COPY . .