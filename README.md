<div align="center">
  <img src="./public/logos/tekimax-logo-ScreenRGB-2.png" alt="Tekimax SDK Logo" width="200" />
  <h1>Tekimax TS</h1>
  <p><strong>A type-safe, framework-agnostic AI SDK for building AI-powered apps.</strong></p>

[![npm version](https://img.shields.io/npm/v/tekimax-ts.svg)](https://www.npmjs.com/package/tekimax-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## 📦 Installation

```bash
npm install tekimax-ts
```

## 💻 Usage

### Standard Provider Pattern (Recommended)

The SDK provides a `TekimaxProvider` that implements the standard `TekimaxAdapter` interface. This allows for interchangeable providers and consistent behavior.

```typescript
import { TekimaxProvider } from 'tekimax-ts'

const provider = new TekimaxProvider({
  apiKey: process.env.TEKIMAX_API_KEY,
})

// Standard Chat
const result = await provider.chat({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Explain quantum computing' }]
})
console.log(result.message.content)

// Streaming Chat
for await (const chunk of provider.chatStream({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Write a long poem' }]
})) {
  process.stdout.write(chunk.delta)
}
```

### React Integration

The SDK includes a `useChat` hook for React applications. To use it, install React:

```bash
npm install react
```

Then import from `tekimax-ts/react`:

```tsx
import { TekimaxProvider } from 'tekimax-ts'
import { useChat } from 'tekimax-ts/react'

const provider = new TekimaxProvider({ apiKey: '...' })

function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    adapter: provider,
    model: 'gpt-4'
  })

  return (
    <div>
      {messages.map((m, i) => (
        <div key={i}><strong>{m.role}:</strong> {m.content}</div>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} disabled={isLoading} />
        <button type="submit" disabled={isLoading}>Send</button>
        <button type="button" onClick={stop} disabled={!isLoading}>Stop</button>
      </form>
    </div>
  )
}
```

### Low-Level Client

You can still use the direct `TekimaxClient` for raw API access if needed:

```typescript
import { TekimaxClient } from 'tekimax-ts'

const client = new TekimaxClient({ apiKey: process.env.TEKIMAX_API_KEY })
const response = await client.sendMessage('Hello!')
console.log(response.text)
```

## 🧠 Motivation and Overview

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
