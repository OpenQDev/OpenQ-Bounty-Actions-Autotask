FROM node:16.19.1-alpine3.17
WORKDIR /app
COPY package.json .
COPY . .
EXPOSE 8070
CMD yarn start:dev