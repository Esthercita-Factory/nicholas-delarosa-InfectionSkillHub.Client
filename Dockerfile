# InfectionSkillHub participant client (Angular) served by Nginx.
#   docker build -t infectionskillhub-client .
#   docker run -p 8082:8080 -e API_UPSTREAM=http://host.docker.internal:8080 infectionskillhub-client
#
# Nginx serves the build and forwards /api to the API (API_UPSTREAM): the browser sees a single
# origin, so no CORS is needed and the production build uses apiUrl = '/api/v1'.

FROM node:22-alpine AS build
WORKDIR /app

# Dependencies first: they stay cached while package-lock.json does not change.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# Non root image listening on 8080. Templates in /etc/nginx/templates go through envsubst on
# start, so API_UPSTREAM can change without rebuilding the image.
FROM nginxinc/nginx-unprivileged:alpine AS final
ENV API_UPSTREAM=http://api:8080
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
USER root
RUN rm -rf /usr/share/nginx/html/*
USER 101
COPY --from=build /app/dist/infectionskillhub-client/browser /usr/share/nginx/html
EXPOSE 8080
