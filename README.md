<div align="center">
  <img src="./public/logos/tekimax-logo-ScreenRGB-2.png" alt="Tekimax SDK Logo" width="200" />
  <h1>TEKIMAX SDK Typescript</h1>
  <p><strong>Type-safe Tekimax Client for Node.js, Browser, and Edge.</strong></p>

  [![npm version](https://img.shields.io/npm/v/tekimax-ts.svg)](https://www.npmjs.com/package/tekimax-ts)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## 📦 Installation

```bash
npm install tekimax-ts
```

## 💻 Usage

The SDK provides a `TekimaxClient` that manages authentication, session state, and response parsing.

```typescript
import { TekimaxClient } from 'tekimax-ts';

const client = new TekimaxClient({
    apiKey: process.env.TEKIMAX_API_KEY
});

// Simple message
const response = await client.sendMessage("Explain quantum computing");
console.log(response.text);

// Continuing a session (preserves context)
const followUp = await client.sendMessage("How does it relate to encryption?", {
    previous_response_id: response.id
});
console.log(followUp.text);
```

## 🧠 Motivation and Overview

Modern LLM systems have converged on similar primitives: messages, function calls, tool usage, and multimodal inputs but each provider encodes them differently. **Tekimax** standardizes these concepts, enabling:

*   **One spec, many providers**: Describe inputs/outputs once; run on OpenAI, Anthropic, Gemini, or local models.
*   **Composable agentic loops**: Unified streaming, tool invocation, and message orchestration.
*   **Easier evaluation and routing**: Compare providers, route requests, and log results through a shared schema.
*   **Blueprints for provider APIs**: Labs and model providers wanting to expose their APIs in a common format can easily do so.

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

---

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
