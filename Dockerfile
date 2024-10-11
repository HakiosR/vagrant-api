FROM node:20-alpine
LABEL version="1.0"
LABEL maintainer="Louis <l.blanleuil0104@gmail.com>"
LABEL description="API pour gérer des VMs avec Vagrant"
LABEL environnement="production"

WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache bash build-base && npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.mjs" ]