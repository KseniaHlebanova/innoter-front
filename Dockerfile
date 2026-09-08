FROM node:24-alpine AS development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

FROM development AS build
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY public/env.template.js /usr/share/nginx/html/env.template.js
COPY scripts/prestart.sh /prestart.sh
RUN chmod +x /prestart.sh
RUN printf 'server { listen 3000; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 3000
ENTRYPOINT ["/prestart.sh"]