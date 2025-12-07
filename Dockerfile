# Use an official Node.js runtime as a base image
FROM node:24-alpine@sha256:682368d8253e0c3364b803956085c456a612d738bd635926d73fa24db3ce53d7

# Define build argument with a default value can be stage or prod
ARG MODE=stage 

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