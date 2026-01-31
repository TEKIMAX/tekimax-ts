<div align="center">
  <img src="./public/logos/tekimax-logo-ScreenRGB-2.png" alt="Tekimax SDK Logo" width="200" />
  <h1>Tekimax TypeScript SDK</h1>
  <p><strong>Type-safe OpenResponses for Node.js, Browser, and Edge.</strong></p>

  [![npm version](https://img.shields.io/npm/v/tekimax-ts.svg)](https://www.npmjs.com/package/tekimax-ts)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## 📖 Overview

The **Tekimax TypeScript SDK** provides fully typed, standards-compliant interfaces for the OpenResponses specification. Generated via [Kubb](https://kubb.dev/), it ensures your application stays in sync with the latest API standards.

## ✨ Features

- **Full TypeScript Support**: strict typing for all API request/response bodies.
- **Runtime Validation**: Optional Zod schemas for validating data at runtime.
- **Universal**: Works in Node.js, React/Vite/Next.js, and Cloudflare Workers.
- **Tree-Shakeable**: Import only what you need.

## 📦 Installation

```bash
# Install directly from GitHub (Release v0.1.0)
npm install github:TEKIMAX/tekimax-ts#v0.1.0

# 🔜 Coming Soon to npm
# npm install tekimax-ts
```

## 💻 Usage

### Importing Types

```typescript
import { 
  UserMessageItemParam, 
  CreateResponseBody 
} from 'tekimax-ts';

// Strongly typed message object
const userMessage: UserMessageItemParam = {
  type: 'message',
  role: 'user',
  content: [
    {
      type: 'input_text',
      text: 'Explain quantum computing'
    }
  ]
};
```

### formatting a Request

```typescript
import { CreateResponseBody } from 'tekimax-ts';

const requestPayload: CreateResponseBody = {
  model: 'tekimax-1.0',
  items: [userMessage],
  stream: true
};

// Send to API with Authentication and Error Handling
try {
  const response = await fetch('https://api.tekimax.com/v1/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify(requestPayload)
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Response:', data);
  
} catch (error) {
  console.error('Failed to generate response:', error);
}
```

### Advanced: Custom Configuration

You can extend the generated types to build your own robust client wrapper:

```typescript
import { CreateResponseBody, RequiredItemParam } from 'tekimax-ts';

interface TekimaxConfig {
    apiKey: string;
    baseUrl?: string;
}

class TekimaxClient {
    constructor(private config: TekimaxConfig) {}

    async generate(body: CreateResponseBody) {
        // Implementation...
    }
}
```

## 🛠️ Development

This SDK is generated from a centralized OpenAPI specification.

### Regenerate Code

If the spec changes, run:

```bash
npm run generate
```

### Build

```bash
npm run build
```

### Secure Container Build

This SDK can be built inside a **Chainguard** container for maximum security and reproducibility.

```bash
# Build using the hardened Chainguard Node.js image
docker build -f Dockerfile -t tekimax-ts .
```

### 🛡️ Security Verification

*   **Scanner**: Trivy (v0.69.0)
*   **Date**: 2026-01-31
*   **Result**: ✅ **0 Vulnerabilities** (Clean)
*   **Base Image**: `cgr.dev/chainguard/node:latest-dev`

---
<div align="center">
  <sub>Built with ❤️ by the Tekimax Team</sub>
</div>
