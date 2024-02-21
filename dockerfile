FROM node:20-alpine AS deps

WORKDIR /src/client/app

RUN apk add --no-cache git

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "deploy"]
