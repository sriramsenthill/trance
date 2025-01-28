FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

FROM node:16-alpine AS runner

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]
