# ------------------------------------------------------------------------------
# FRONTEND IMAGE
# ------------------------------------------------------------------------------

ARG frontend_image=scratch

FROM $frontend_image AS frontend_image

# ------------------------------------------------------------------------------
# BASE BUILD
# ------------------------------------------------------------------------------

FROM node:16-alpine AS base

WORKDIR /app

COPY . .

COPY --from=frontend_image /dist /frontend
ENV FRONTEND_PATH=/frontend

ENTRYPOINT ["npm", "run"]

CMD ["start"]

# ------------------------------------------------------------------------------
# DEVELOPMENT BUILD
# ------------------------------------------------------------------------------

FROM base AS development

ENV NODE_ENV=development
RUN npm ci

USER node

# ------------------------------------------------------------------------------
# PRODUCTION BUILD
# ------------------------------------------------------------------------------

FROM base AS production

ENV NODE_ENV=production
RUN npm ci

USER node
