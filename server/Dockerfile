FROM node:18.12.0

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

ENV NODE_ENV=production
ENV PORT=5001

CMD ["npm", "start"]
EXPOSE ${PORT}