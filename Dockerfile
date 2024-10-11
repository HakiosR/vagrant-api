FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache bash build-base && npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.mjs"]
