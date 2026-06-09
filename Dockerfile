# Multi-stage Dockerfile for building TypeScript Node app
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (including dev) to build
COPY package*.json tsconfig.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built output
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Use the same start script as package.json
CMD ["node", "dist/index.js"]
