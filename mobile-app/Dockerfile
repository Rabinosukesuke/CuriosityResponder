FROM node:20.10-alpine

WORKDIR /app

COPY ./mobile-app/app .

EXPOSE 8081

RUN npm install

RUN npm install --global @expo/ngrok@^4.1.0
