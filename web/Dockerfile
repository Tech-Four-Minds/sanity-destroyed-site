FROM node:latest

WORKDIR /temp/app

COPY . .

RUN rm -rf node_modules

RUN npm install

RUN rm -rf /dist/assets/css

RUN npm run build-css

RUN mkdir -p /var/www/html/web

RUN mv dist /var/www/html/web

RUN mv index.html /var/www/html/web

WORKDIR /

RUN rm -rf /temp/app