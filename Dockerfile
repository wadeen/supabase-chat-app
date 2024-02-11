FROM node:20.11.0-alpine

ENV APP_ROOT /var/www
ENV LANG=ja_JP.UTF-8
ENV LANGUAGE=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

RUN apk update && \
  apk add git bash curl musl musl-utils musl-locales tzdata && \
  npm i -g create-react-app jshint

RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT

COPY ./package.json $APP_ROOT
COPY ./package-lock.json $APP_ROOT
RUN yarn install

COPY . $APP_ROOT

# CMD [ "npm", "dev" ]
