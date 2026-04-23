FROM node:24.12.0-alpine
WORKDIR /app/frontend
COPY package*.json .
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "dist"]