FROM node:12.22.12
WORKDIR /app
RUN apk update && apk upgrade && \
	apk add --no-cache bash git
COPY package.json .
RUN yarn
COPY . .
EXPOSE 8070
CMD yarn start:dev