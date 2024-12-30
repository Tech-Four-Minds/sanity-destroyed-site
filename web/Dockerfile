FROM node:latest

WORKDIR /temp/app

COPY . .

RUN rm -rf node_modules

RUN npm install

RUN rm -rf /dist/assets/css

RUN npm run build-css

RUN mkdir -p /var/www/html

RUN mv dist /var/www/html

RUN mv index.html /var/www/html

WORKDIR /

RUN rm -rf /temp/app