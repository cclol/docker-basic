FROM node:10.16-alpine
EXPOSE 80

RUN apk --no-cache add --virtual builds-deps build-base python inotify-tools bash

RUN mkdir -p /data/app
COPY ./app /data/app/
WORKDIR /data/app

RUN yarn global add db-migrate

ENV NPM_REGISTRY=repository.netkey.at/repository/npm/
RUN npm config set registry https://${NPM_REGISTRY}

RUN npm install -g nodemon
RUN npm install
RUN npm rebuild bcrypt --build-from-source

COPY ./migrate.sh /
RUN chmod +x /migrate.sh

ENTRYPOINT ["/migrate.sh"]
CMD [ "npm", "start"]

