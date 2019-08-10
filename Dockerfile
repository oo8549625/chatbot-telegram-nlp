ARG NODE_VERSION=10
FROM node:$NODE_VERSION-slim

ENV HOME=/usr/src/data \
    BOT_TOKEN=917389757:AAEAr8tE9SJ0TXSrtopV1TEBBNaHfuMxGAM \
    BOT_NAME=owenchatbot

RUN mkdir -p $HOME/nlp_data

WORKDIR $HOME
COPY . .
RUN npm install

CMD npm start