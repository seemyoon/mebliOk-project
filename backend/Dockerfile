FROM node:22-alpine
LABEL authors="Semyon"

RUN mkdir /backend
WORKDIR /backend

COPY ./backend/package*.json ./
RUN yarn install

COPY ./backend ./