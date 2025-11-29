FROM node:20-alpine

WORKDIR /app

# Install build deps
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production

# Copy source
COPY . .

# Build Next app
RUN npm run build

ENV PORT 3000

EXPOSE 3000

CMD ["npm", "run", "start"]
