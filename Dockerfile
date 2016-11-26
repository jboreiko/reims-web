FROM node:6.9.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

EXPOSE 3000

CMD ["npm", "start", "3000"]

