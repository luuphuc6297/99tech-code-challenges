FROM node:18-alpine AS builder

WORKDIR /build

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json ./

RUN pnpm install

COPY . .

RUN pnpm build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and built code
COPY --from=builder /build/package.json ./
COPY --from=builder /build/pnpm-lock.yaml ./
COPY --from=builder /build/tsconfig.json ./
COPY --from=builder /build/tsconfig.build.json ./
COPY --from=builder /build/dist ./dist

# Install production dependencies
RUN npm install -g pnpm && \
    pnpm install --prod

ENV NODE_PATH=./dist
ENV TS_NODE_BASEURL=./dist

EXPOSE 3000

CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]