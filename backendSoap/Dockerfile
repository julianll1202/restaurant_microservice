FROM node:18 AS Proyecto

ENV NODE_ENV = proyecto

WORKDIR /usr/src/backendSoap

COPY package.json .
COPY package-lock.json .
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]