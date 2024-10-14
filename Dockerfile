FROM node:20-alpine
LABEL version="1.0"
LABEL maintainer="Hakios <contact@lblanleuil.fr>"
LABEL description="API pour gérer des VMs avec Vagrant"
LABEL environnement="production"

WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache bash build-base && npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.mjs" ]
