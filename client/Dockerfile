FROM node:18.12.0 as build

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
#RUN echo "BEFORE BUILD" && ls -l
RUN npm run build


FROM nginx

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
ENV WEB_API_URL="http://localhost:5007"

RUN echo "NGINX DIR" && ls -l
EXPOSE 80