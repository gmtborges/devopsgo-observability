FROM node:20-alpine
WORKDIR /usr/local/app
COPY package.json package-lock.json .
RUN npm ci
COPY . .

EXPOSE 8080/tcp
CMD ["node", "-r", "ts-node/register", "-r", "./instrumentation.ts", "--env-file", ".env", "app.ts"]
