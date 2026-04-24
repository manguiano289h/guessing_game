FROM node:24.12.0-alpine
WORKDIR /app/frontend
COPY package*.json .
RUN npm install
RUN npm install serve
COPY . .
RUN npm run build
CMD ["npx", "serve", "-s", "dist"]