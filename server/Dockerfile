FROM node:18.12.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm i -gf yarn
RUN yarn

COPY . .