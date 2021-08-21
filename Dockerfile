FROM node:16-alpine AS production

WORKDIR /app

RUN npm install -g npm@7

COPY . .

ENV NODE_ENV=production
RUN npm ci

USER node

ENTRYPOINT ["npm"]

CMD ["start"]

FROM production AS development
