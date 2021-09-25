ARG frontend_image

FROM $frontend_image AS frontend_image

FROM node:16-alpine AS production

WORKDIR /app

COPY . .

ENV NODE_ENV=production
RUN npm ci

COPY --from=frontend_image /dist /frontend

ENV FRONTEND_PATH=/frontend

USER node

ENTRYPOINT ["npm run"]

CMD ["start"]

FROM production AS development

ENV NODE_ENV=development
