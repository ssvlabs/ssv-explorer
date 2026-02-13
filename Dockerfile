# Use an official Node.js runtime as a base image
FROM node:24-alpine@sha256:4f696fbf39f383c1e486030ba6b289a5d9af541642fc78ab197e584a113b9c03

# Define build argument with a default value can be stage or prod
ARG MODE=prod 

# Optional: Set an ENV if you want it at runtime too
ENV MODE=${MODE}

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
COPY .env.${MODE} .env

# Build app
RUN pnpm docker-build

# Expose the listening port
EXPOSE 3000

# Launch app with PM2
CMD [ "pnpm", "start" ]