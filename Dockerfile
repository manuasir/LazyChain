FROM node:10.12.0-alpine

WORKDIR /lazychain

ENV NODE_PORT 17080
ENV HTTP_PORT 3000

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm build

CMD ["node", "app.js"]
