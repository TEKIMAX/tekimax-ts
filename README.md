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

## 🛠️ Usage

### 1. Initialize the Client

```typescript
import { Tekimax } from 'tekimax-ts';
import { OpenAIProvider } from 'tekimax-openai';
import { AnthropicProvider } from 'tekimax-anthropic';

// Initialize with OpenAI
const client = new Tekimax({
  provider: new OpenAIProvider({ apiKey: process.env.OPENAI_API_KEY })
});

// Want to switch to Anthropic? Just swap the provider:
// const client = new Tekimax({
//   provider: new AnthropicProvider({ apiKey: process.env.ANTHROPIC_API_KEY })
// });
```

### 2. Stream Chat Responses

The API is identical regardless of the provider.

```typescript
import { UserMessage } from 'tekimax-ts';

const messages: UserMessage[] = [
  { role: 'user', content: 'Explain quantum computing in 5 words.' }
];

const stream = await client.chat.completions.create({
  model: 'gpt-4o', // or 'claude-3-5-sonnet-20240620'
  messages,
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

### 3. Use in React

```tsx
import { useChat } from 'tekimax-ts/react';
import { OpenAIProvider } from 'tekimax-openai';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    provider: new OpenAIProvider({ apiKey: '...' }), // In production, use a proxy endpoint!
  });

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  );
}
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

## 💖 Support

Tekimax is open source. If you find it valuable, please consider [becoming a sponsor](https://github.com/sponsors/TEKIMAX) to support long-term maintenance.

# Start Docs Site
npx turbo dev --filter=docs
```

---

<div align="center">
  <p>Built with ❤️ by the Tekimax Team</p>
  <p>Secure by Design • Type-Safe by Default</p>
</div>
