FROM node:26-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# multi-stage dockerfile
FROM node:26-alpine AS linter
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run lint

# serveur web
FROM nginx:1.31.8-alpine
# Copy config nginx
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
