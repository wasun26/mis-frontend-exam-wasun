FROM node:18-alpine

RUN apk add --no-cache bash

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev", "-o"]
