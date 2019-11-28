FROM node:10.16-alpine
EXPOSE 80

RUN mkdir -p /data/app
COPY ./app /data/app/
WORKDIR /data/app

ENV NPM_REGISTRY=repository.netkey.at/repository/npm/
RUN npm config set registry https://${NPM_REGISTRY}

RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -g nodemon
RUN npm install
RUN npm rebuild bcrypt --build-from-source

CMD [ "npm", "start" ]