FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies early to leverage Docker cache
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# Copy rest of the app
COPY . .

# Build the Next.js app
RUN pnpm docker-build

FROM node:20-alpine AS runner

WORKDIR /app

# Only copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tsconfig.json ./

# Set environment variables (override in docker-compose or runtime)
ENV NODE_ENV=production

# Expose port (default Next.js port)
EXPOSE 3000

# Start the Next.js server
CMD ["node_modules/.bin/next", "start"]
