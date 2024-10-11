FROM node:20-alpine
WORKDIR /app
COPY /tmp/mongit/packages*.json ./
RUN apk add --no-cache bash build-base && npm install
COPY /tmp/mongit/. .
EXPOSE 3000
CMD ["node", "app.mjs"]