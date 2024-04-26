# base stage
FROM mcr.microsoft.com/playwright:focal AS base
RUN apt-get update && apt-get install -y python3 python3-pip
ENV PYTHON=/usr/bin/python3

WORKDIR /app
COPY package*.json .
COPY *.config.js .
RUN npm ci

FROM base AS test
ENV FORCE_COLOR=true
COPY . .
RUN npm run check