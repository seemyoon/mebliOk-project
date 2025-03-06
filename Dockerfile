FROM node:22-alpine
LABEL authors="Semyon"

RUN mkdir /app
WORKDIR /app

COPY ./backend/package*.json ./app

COPY ./backend ./
RUN yarn install