# Providers and Adapters

Tekimax TS is designed around the **Adapter Pattern**. This allows you to write your application code once against a common interface (`TekimaxAdapter`) and switch underlying AI providers without changing your business logic.

## The TekimaxAdapter Interface

The core interface is defined in `src/core/adapter.ts`:

```typescript
export interface TekimaxAdapter {
  readonly name: string
  
  chat(options: ChatOptions): Promise<ChatResult>
  chatStream(options: ChatOptions): AsyncIterable<StreamChunk>
}
```

## Available Providers

### TekimaxProvider

The default provider that connects to the Tekimax API proxy.

```typescript
import { TekimaxProvider } from 'tekimax-ts'

const provider = new TekimaxProvider({ 
  baseUrl: 'https://api.tekimax.com', // optional
  apiKey: process.env.TEKIMAX_API_KEY
})
```

## Creating Custom Providers

You can implement your own provider by adhering to the `TekimaxAdapter` interface. For example, to wrap a local custom model:

```typescript
import { TekimaxAdapter, ChatOptions, ChatResult, StreamChunk } from 'tekimax-ts'

export class LocalProvider implements TekimaxAdapter {
  readonly name = 'local-llm'

  async chat(options: ChatOptions): Promise<ChatResult> {
    // Call your local service
    return {
      message: { role: 'assistant', content: 'Local response' }
    }
  }

  async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
    // Yield chunks
    yield { delta: 'Local ' }
    yield { delta: 'Response' }
  }
}
```

This architecture enables you to mix and match providers or create a "Router" provider that selects the best model for the task.
