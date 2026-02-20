# Stage 1: Build in dev image (has npm, build tools)
FROM cgr.dev/chainguard/node:latest-dev AS builder

WORKDIR /app

# Copy dependency definitions
COPY --chown=node:node package.json package-lock.json ./

# Install dependencies
RUN npm ci --ignore-scripts --legacy-peer-deps

# Copy the source code
COPY --chown=node:node . .

# Explicitly ensure spec is copied
COPY --chown=node:node spec ./spec
RUN ls -la /app && ls -la /app/spec

# Generate the SDK code from the OpenAPI spec
RUN npm run generate

# Build the TypeScript project
RUN npm run build

# Verify that the build artifact exists
RUN ls -la dist/index.js

# Stage 2: Production image (minimal, no shell, no package manager)
FROM cgr.dev/chainguard/node:latest

WORKDIR /app

# Copy only production artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

CMD ["echo", "SDK built successfully in secure Chainguard container"]
