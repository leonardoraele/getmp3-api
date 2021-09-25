FROM node:16-alpine AS production

WORKDIR /app

COPY . .

ENV NODE_ENV=production
RUN npm ci

COPY --from=gcr.io/leonardoraele/getmp3-ui:latest /dist /frontend

ENV FRONTEND_PATH=/frontend

USER node

ENTRYPOINT ["npm run"]

CMD ["start"]

FROM production AS development

ENV NODE_ENV=development
