# Use Chainguard Node.js 'dev' image which includes build tools (npm, apk, etc.)
# release chaimguard images are stripped of shells and package managers for security
FROM cgr.dev/chainguard/node:latest-dev AS builder

WORKDIR /app

# Copy dependency definitions
COPY --chown=node:node package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the source code
COPY --chown=node:node . .

# Generate the SDK code from the OpenAPI spec
RUN npm run generate

# Build the TypeScript project
RUN npm run build

# Verify that the build artifact exists
RUN ls -la dist/index.js

CMD ["echo", "SDK built successfully in secure Chainguard container"]
