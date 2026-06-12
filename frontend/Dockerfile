# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Run stage
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/.output ./.output
COPY --from=build /app/package*.json ./

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", ".output/server/index.mjs"]
