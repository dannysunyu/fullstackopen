FROM node:16

WORKDIR /usr/src/app

RUN npm config set registry https://registry.npm.taobao.org

COPY --chown=node:node . .
RUN npm ci --omit=dev

ENV DEBUG=todo-backend:*

USER node
CMD npm start