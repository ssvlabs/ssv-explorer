# Use an official Node.js runtime as a base image
FROM node:20.10-alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN npm install -g pnpm

# Copy package files for dependency installation
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy all files
COPY ./ ./
COPY .env.example .env

# Build app
RUN pnpm docker-build

# Expose the listening port
EXPOSE 3000

# Launch app with PM2
CMD [ "pnpm", "start" ]