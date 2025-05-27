FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies early to leverage Docker cache
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# Copy rest of the app
COPY . .

ENV SSV_NETWORKS=[{"networkId":560048,"apiVersion":"v4","apiNetwork":"hoodi","api":"https://api.stage.ops.ssvlabsinternal.com/api","explorerUrl":"https://hoodi.explorer.ssv.network","insufficientBalanceUrl":"https://faucet.ssv.network","googleTagSecret":"GTM-K3GR7M5","tokenAddress":"0x9F5d4Ec84fC4785788aB44F9de973cF34F7A038e","setterContractAddress":"0x58410Bef803ECd7E63B23664C586A6DB72DAf59c","getterContractAddress":"0x5AdDb3f1529C5ec70D77400499eE4bbF328368fe"}]
ENV NEXT_PUBLIC_SSV_NETWORKS=[{"networkId":560048,"apiVersion":"v4","apiNetwork":"hoodi","api":"https://api.stage.ops.ssvlabsinternal.com/api","explorerUrl":"https://hoodi.explorer.ssv.network","insufficientBalanceUrl":"https://faucet.ssv.network","googleTagSecret":"GTM-K3GR7M5","tokenAddress":"0x9F5d4Ec84fC4785788aB44F9de973cF34F7A038e","setterContractAddress":"0x58410Bef803ECd7E63B23664C586A6DB72DAf59c","getterContractAddress":"0x5AdDb3f1529C5ec70D77400499eE4bbF328368fe"}]

# Build the Next.js app
RUN pnpm build

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
