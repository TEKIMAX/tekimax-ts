# Tekimax TS vs TanStack AI Analysis Report

This report compares `tekimax-ts` against `tanstack-ai`, highlighting best practices, feature gaps, and recommendations to elevate Tekimax to a multi-provider AI SDK.

## Overview

| Feature              | Tekimax TS                   | TanStack AI                                                 |
| :------------------- | :--------------------------- | :---------------------------------------------------------- |
| **Architecture**     | Single Package Client        | Monorepo (Nx + Pnpm)                                        |
| **Core Abstraction** | HTTP Client (Kubb generated) | Framework Agnostic Core (`@tanstack/ai`)                    |
| **Providers**        | Single (Tekimax API Proxy)   | Modular Adapters (OpenAI, Anthropic, Gemini, Ollama, etc.)  |
| **Type Safety**      | Typescript (Kubb Zod/TS)     | Typescript Strict + JSDoc                                   |
| **Linting/Quality**  | Minimal                      | Robust (Eslint, Prettier, Publint, Knip, Sherif)            |
| **Release**          | NPM                          | Changesets + GitHub Actions                                 |
| **Features**         | Chat (REST)                  | Chat, Streaming, Image/Video/Speech Gen, Tools, Agent Loops |

## Deep Dive: TanStack AI Best Practices

### 1. Monorepo Structure

TanStack AI uses a **pnpm + Nx** workspace. This allows them to separate the "Core" logic from specific "Adapters".

- `packages/typescript/ai`: The core library defining interfaces (`Activity`, `ToolDefinition`) and shared utilities.
- `packages/typescript/ai-openai`: An implementation of the core interfaces for OpenAI.
- `packages/typescript/ai-react`: React hooks and UI components.

**Benefit:** Users only install what they need (Tree-shaking).
**Recommendation for Tekimax:** If Tekimax aims to be a general SDK, adopt a monorepo structure where `@tekimax/ai` is the core, and providers are plugins.

### 2. The "Adapter" Pattern

TanStack AI doesn't just call APIs; it normalizes them.
`package.json` exports `activities`:

```typescript
export { chat, summarize, generateImage } from './activities/index'
```

It defines standard interfaces (`TextAdapter`, `ImageAdapter`) so code written for one provider works for others.

**Recommendation:** Tekimax should define a `TekimaxAdapter` interface that allows swapping the backend (Direct Tekimax API vs Direct OpenAI vs Local Model).

### 3. Tooling & Quality

TanStack AI uses a suite of tools to ensure quality:

- **Sherif**: Opinions on package.json (sorting, version mismatch).
- **Knip**: Finds unused files and dependencies.
- **Publint**: Ensures package exports map to valid files.
- **Eslint/Prettier**: Shared configs (`@tanstack/eslint-config`).

**Recommendation:** Add `eslint`, `prettier`, and `publint` to `tekimax-ts`.

### 4. Documentation & Examples

TanStack AI has a massive `examples/` directory and complex documentation generation (`scripts/generate-docs.ts`).

- They auto-generate docs from source references.
- They have a simplified "Get Involved" section we just mimicked.

## Gap Analysis: What Tekimax is Missing

1.  **Framework Agnostic Core**: Tekimax TS is currently just a wrapper around the Tekimax API. It doesn't have a "Core" independent of the network layer.
2.  **Streaming Abstractions**: TanStack AI has `StreamProcessor`, `toServerSentEventsStream`, `toHttpStream`. Tekimax relies on raw response handling (based on current view).
3.  **UI Integration**: TanStack AI has `@tanstack/ai-react` with hooks. Tekimax TS has no UI adapters yet.
4.  **Linting/CI Rules**: Tekimax TS lacks the rigorous `test:types`, `test:lint` pipelines.

## Action Plan

To "update our SDK to reflect that as well":

1.  **Adopt Tooling (Immediate)**:
    - Install `eslint`, `prettier`, `publint`.
    - Create a strictly compliant `tsconfig.json`.

2.  **Refactor Directory (Medium Term)**:
    - Consider moving to a monorepo or at least structuring `src` to separate `core` interfaces from `client` implementation.

3.  **Implement Adapters (Strategic)**:
    - Define a `TekimaxProvider` interface.
    - Make the current `TekimaxClient` just one implementation of that provider.

4.  **Documentation**:
    - We already started this. Continue by adding a `guides/` folder for specific use cases (Streaming, Tools).
