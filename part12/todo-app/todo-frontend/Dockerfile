FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .
RUN npm config set registry https://registry.npmmirror.com

ENV REACT_APP_BACKEND_URL=http://localhost:3000
RUN npm ci
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html