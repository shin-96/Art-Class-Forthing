FROM node:24-alpine
WORKDIR /app
COPY package.json ./
COPY server ./server
COPY curriculum ./curriculum
COPY public ./public
COPY docs ./docs
COPY README.md ./
ENV PORT=4173
EXPOSE 4173
VOLUME ["/app/data"]
CMD ["node", "server/main.mjs"]
