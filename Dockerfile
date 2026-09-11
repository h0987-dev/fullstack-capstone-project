FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY frontend/package*.json frontend/
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "backend/index.js"]
