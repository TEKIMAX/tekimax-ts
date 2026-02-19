<div align="center">
  <img src="https://raw.githubusercontent.com/TEKIMAX/tekimax-ts/main/apps/docs/public/tekimax-logo.png" alt="Tekimax SDK Logo" width="200" />
  <h1>Tekimax TS</h1>
  <p><strong>The Universal Standard.</strong></p>
  <p>A type-safe, framework-agnostic AI SDK for building AI-powered apps.</p>

[![npm version](https://img.shields.io/npm/v/tekimax-ts.svg)](https://www.npmjs.com/package/tekimax-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## 📦 Installation

```bash
npm install tekimax-ts
```

## 🌟 Features

- **Universal API**: One interface for all providers. Switch from OpenAI to Ollama with a single config change.
- **Strict Modality Type Safety**: End-to-end TypeScript support. Strong capability interfaces ensure compile-time safety (e.g., your code won't compile if you call `.images.generate()` on a provider missing the `ImageGenerationCapability`). Zod schemas for runtime validation.
- **Zero Latency**: Lightweight adapter pattern with zero runtime overhead.
- **Zero CVEs**: Hardened supply chain using Chainguard images.
- **Redis Adapter** _(optional)_: Response caching, rate limiting, token budgets, and session storage with any Redis client.
- **Convex Integration**: Provision and manage [Convex](https://convex.dev) projects, push schemas, set env vars, and deploy — all from code.

## 💻 Usage

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

// Custom Model Proxies (e.g. Internal API gateways)
const proxyClient = new Tekimax({
    provider: new OpenAIProvider({ 
        apiKey: process.env.CUSTOM_PROXY_KEY,
        baseURL: 'https://api.my-custom-proxy.internal/v1' 
    })
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

## 📚 Documentation

For full documentation, guides, and API references, visit **[docs.tekimax.com](https://docs.tekimax.com)**.

## 🧠 Motivation


Modern LLM systems have converged on similar primitives: messages, function calls, tool usage, and multimodal inputs but each provider encodes them differently. **Tekimax** standardizes these concepts, enabling:

- **One spec, many providers**: Describe inputs/outputs once; run on OpenAI, Anthropic, Gemini, or local models.
- **Composable agentic loops**: Unified streaming, tool invocation, and message orchestration.
- **Easier evaluation and routing**: Compare providers, route requests, and log results through a shared schema.
- **Blueprints for provider APIs**: Labs and model providers wanting to expose their APIs in a common format can easily do so.

## 🔑 Key Principles

### Agentic Loop

All models, to some extent, exhibit agency: the ability to perceive input, reason, act through tools, and reflect on outcomes.

The **Tekimax Standard** at its core is designed to expose the power of this agentic loop to developers, making requests that allow the model to do multiple things and yield back a result, whether this is developer-hosted tool calls where control is yielded back to the user, or provider-hosted tools where control is held by the model provider until the model signals an exit criteria.

Tekimax defines a common pattern for defining control flow in the agent loop, a set of item definitions for developer-controlled tools, and pattern for defining provider and router-hosted tools.

### Items → Items

Items are the fundamental unit of context in Tekimax: they represent an atomic unit of model output, tool invocation, or reasoning state. Items are bidirectional, they can be provided as inputs to the model, or as outputs from the model.

Each item type has a defined schema that binds it and contains properties specific to its unique purpose.

Tekimax defines a common set of items supported by a quorum of model providers, and defines how provider-specific item types can be defined.

### Semantic Events

Streaming is modeled as a series of semantic events, not raw text or object deltas.

Events describe meaningful transitions. They are either state transitions (e.g., `response.in_progress`, `response.completed`) or they can represent a delta from a previous state (e.g., `response.output_item.added`, `response.output_text.delta`).

Tekimax defines a common set of streaming events supported by a quorum of model providers, and defines how provider-specific streaming events can be defined.

### State Machines

Objects in Tekimax are state machines, that is, they can live in one of a finite number of states, such as `in_progress`, `completed`, or `failed`. The spec defines the set of valid states for each state machine in the API.

## 🛡️ Security & Trust

At **Tekimax**, we believe security is a feature, not an afterthought.

- **Zero Vulnerabilities**: We enforce a strict **Zero CVE** policy. Our SDK is audited daily.
- **Minimal Surface Area**: By optimizing our dependency tree, we identified and **removed 159 unnecessary packages**, drastically reducing the attack surface.
- **Secured by Chainguard**: Our build pipeline and artifacts rely on [Chainguard Images](https://www.chainguard.dev/chainguard-images)—hardened, minimal container images designed to secure the software supply chain. Chainguard images are stripped of shells, package managers, and other unnecessary tools that attackers often exploit.

Supply chain attacks on the Node.js/npm ecosystem are increasingly common. By building on Chainguard, we ensure that the Tekimax SDK meets the highest standards of integrity and safety for enterprise and production use.

## ⚡ Optional Redis Adapter

```typescript
import { ResponseCache, RateLimiter, TokenBudget, SessionStore } from 'tekimax-ts'
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL)
const cache   = new ResponseCache(redis, { ttl: 3600 })       // Cache responses
const limiter = new RateLimiter(redis, { maxRequests: 60 })    // Rate limit
const budget  = new TokenBudget(redis, { maxTokens: 100_000 }) // Token budget
const sessions = new SessionStore(redis, { ttl: 1800 })        // Sessions
```

## 🗺️ Roadmap

| Feature | Description | Status |
|---------|-------------|--------|
| **Batch API** | OpenAI's Batch API for 50% cost reduction on large jobs. Queue thousands of requests and retrieve results asynchronously. | 🔜 Planned |
| **Edge Runtime** | Cloudflare Workers / Deno support. Current `Buffer` usage blocks edge compatibility — will be replaced with `Uint8Array` and Web Streams. | 🔜 Planned |
| **Assistants / Threads** | Stateful conversation management with persistence. Create threads, append messages, and resume conversations across sessions. | 🔜 Planned |
| **Fine-tuning API** | Programmatic fine-tuning via OpenAI and Gemini APIs. Upload training data, launch jobs, and deploy custom models through a unified interface. | 🔜 Planned |
| **Observability** | OpenTelemetry spans for every provider call — latency, tokens, cost, and error rate. | 🔜 Planned |
| **Convex Integration** | Provision and manage [Convex](https://convex.dev) projects directly via the SDK. Create projects, push schemas, set env vars, and deploy. | ✅ Shipped |
| **Redis Adapter** | Optional response caching, rate limiting, token budget tracking, and session storage with any Redis-compatible client. | ✅ Shipped |

> **Want to help?** Pick a feature and open a PR, or join the discussion in [GitHub Issues](https://github.com/TEKIMAX/tekimax-ts/issues).

## Get Involved

- We welcome issues and pull requests!
- Participate in **GitHub Discussions**.
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions.

## Partners

We're looking for Tekimax Partners to join our mission! Partner with us to push the boundaries of Tekimax and build amazing things together.

[LET'S CHAT](mailto:info@tekimax.com?subject=Tekimax%20Partnership)

## Code of Conduct

## Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

<div align="center">
  <p>
    <strong>Secured by <a href="https://www.chainguard.dev">Chainguard</a></strong><br>
    Zero-CVE Images for a Safe Supply Chain
  </p>
  <p>
    Built on the <a href="https://openresponses.org">OpenResponses Standard</a> • Generated with <a href="https://kubb.dev">Kubb</a>
  </p>
  <sub>Built with ❤️ by the Tekimax Team</sub>
</div>
