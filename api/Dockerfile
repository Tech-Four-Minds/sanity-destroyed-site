FROM node:latest

WORKDIR /api
COPY package.json /api/package.json
COPY *.js /app/
RUN npm install npm@latest -g

CMD     ["node","/app/index.js"]