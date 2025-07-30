# Build do Angular
FROM node:20 AS build
WORKDIR /cs_storage
COPY . .
RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
