FROM node:10.16-alpine
EXPOSE 80

RUN mkdir -p /data/app
COPY ./app /data/app/
WORKDIR /data/app

RUN npm install

CMD [ "npm", "start" ]