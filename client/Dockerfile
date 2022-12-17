FROM node:18.12.0-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm i -gf yarn
RUN yarn

COPY . .

ARG web_api_url
ENV WEB_API_URL=${web_api_url}
RUN echo "WEB_API_URL=$WEB_API_URL" > .env


RUN yarn build

RUN yarn global add serve