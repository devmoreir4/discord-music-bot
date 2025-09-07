FROM node:22-alpine

# Install system dependencies
RUN apk add --no-cache \
    ffmpeg \
    python3 \
    make \
    g++

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S capyvibes -u 1001 && \
    chown -R capyvibes:nodejs /app

USER capyvibes

CMD ["npm", "start"]
