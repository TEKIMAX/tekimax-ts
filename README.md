<div align="center">
  <img src="https://raw.githubusercontent.com/TEKIMAX/tekimax-ts/main/apps/docs/public/tekimax-logo.png" alt="Tekimax SDK Logo" width="120" />
  <h1>Tekimax SDK</h1>
  <p><strong>The Universal AI Adapter Layer</strong></p>
  
  <p>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6.svg" alt="TypeScript"></a>
    <a href="https://tekimax.com"><img src="https://img.shields.io/badge/Standard-Tekimax-000000.svg" alt="Standard"></a>
  </p>
  
  <p>
    Integrate <strong>OpenAI</strong>, <strong>Anthropic</strong>, <strong>Gemini</strong>, <strong>Ollama</strong>, <strong>Grok</strong>, and <strong>OpenRouter</strong> with a single, type-safe API.
  </p>

  <div>
    <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
    <img src="https://img.shields.io/badge/Anthropic-D06940?style=for-the-badge&logo=anthropic&logoColor=white" alt="Anthropic" />
    <img src="https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white" alt="Gemini" />
    <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white" alt="Ollama" />
    <img src="https://img.shields.io/badge/Grok-000000?style=for-the-badge&logo=x&logoColor=white" alt="Grok" />
    <img src="https://img.shields.io/badge/OpenRouter-6366F1?style=for-the-badge&logo=openai&logoColor=white" alt="OpenRouter" />
  </div>
</div>

---

## 🚀 The Universal Standard

The **Tekimax SDK** solves the fragmentation of AI APIs. Instead of rewriting your integration code for every provider (handling different request formats, streaming implementations, and error types), you use **one standard interface**.

- **Write Once, Run Anywhere**: Switch between OpenAI (Cloud) and Ollama (Local) with a singe line of config.
- **Type-Safe**: Full TypeScript support with Zod validation for inputs and outputs.
- **Edge Compatible**: Zero-dependency core designed for Vercel Edge, Cloudflare Workers, and simplistic Node.js environments.
- **React Ready**: Includes `useChat` and `useCompletion` hooks for instant UI integration.



## 💻 Installation

```bash
# Install core and your desired adapters
npm install tekimax-ts
```

## � Usage

### 1. Initialize the Client

The `Tekimax` client is the unified entry point. It wraps any provider (OpenAI, Anthropic, Ollama, etc.) and exposes a consistent multi-modal interface.

```typescript
import { 
  Tekimax, 
  OpenAIProvider, 
  AnthropicProvider, 
  OllamaProvider,
  GeminiProvider 
} from 'tekimax-ts'

// OpenAI
const client = new Tekimax({
    provider: new OpenAIProvider({ apiKey: process.env.OPENAI_API_KEY })
})

// Anthropic
const claude = new Tekimax({
    provider: new AnthropicProvider({ apiKey: process.env.ANTHROPIC_API_KEY })
})

// Ollama (Local)
const local = new Tekimax({
    provider: new OllamaProvider({ baseUrl: 'http://localhost:11434' })
})
```

### 2. Multi-Modal Interfaces

The client is organized into cohesive namespaces:

#### Text (Chat)

```typescript
const response = await client.text.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: 'Hello!' }]
})
console.log(response.message.content)
```

#### Images (Generation & Vision)

```typescript
// Generate
const image = await client.images.generate({
    model: 'dall-e-3',
    prompt: 'A cyberpunk city',
    size: '1024x1024'
})

// Analyze (Vision)
const analysis = await client.images.analyze({
    model: 'gpt-4o',
    image: 'https://example.com/image.png',
    prompt: 'Describe this scene'
})
```

#### Audio (TTS)

```typescript
const audio = await client.audio.speak({
    model: 'tts-1',
    input: 'Hello world',
    voice: 'alloy'
})
```

#### Video (Analysis)

```typescript
const analysis = await client.videos.analyze({
    model: 'gemini-1.5-flash',
    video: 'https://example.com/video.mp4',
    prompt: 'Summarize this clip'
})
```

## 🏗️ Monorepo Structure

This repository is managed as a **Turborepo** monorepo.

- **`apps/docs`**: Documentation site (Next.js + Fumadocs).
- **`packages/*`**: Core SDK and Provider Adapters.
- **`tekimax-cli`**: Developer tools for Tekimax.

### Commands

```bash
# Build all packages
npx turbo build

# Run tests
npx turbo test

# Start Docs Site
npx turbo dev --filter=docs
```

## 💖 Support

Tekimax is open source. If you find it valuable, please consider [becoming a sponsor](https://github.com/sponsors/TEKIMAX) to support long-term maintenance.

---

<div align="center">
  <p>Built with ❤️ by the Tekimax Team</p>
  <p>Secure by Design • Type-Safe by Default</p>
</div>
