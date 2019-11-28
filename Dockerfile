FROM node:10.16-alpine
EXPOSE 80

RUN mkdir -p /data/app
COPY ./app /data/app/
WORKDIR /data/app

ENV NPM_REGISTRY=repository.netkey.at/repository/npm/
RUN npm config set registry https://${NPM_REGISTRY}

# RUN npm install -g nodemon
RUN npm install

CMD [ "npm", "start" ]