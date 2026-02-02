# Streaming with Tekimax TS

The **Tekimax Provider** supports real-time streaming of responses using Server-Sent Events (SSE). This allows you to display partial results to specific users as they are generated, improving perceived latency.

## Basic Usage

The `chatStream` method returns an `AsyncIterable<StreamChunk>`. You can iterate over this using a `for await...of` loop.

```typescript
import { TekimaxProvider } from 'tekimax-ts'

const provider = new TekimaxProvider({ apiKey: '...' })

async function streamResponse() {
  const stream = provider.chatStream({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Tell me a story.' }],
    maxTokens: 100
  })

  for await (const chunk of stream) {
    // chunk.delta contains the new text fragment
    process.stdout.write(chunk.delta)
  }
}

streamResponse()
```

## How It Works

Under the hood, `TekimaxClient` uses `eventsource-parser` to handle the standard SSE stream from the API. The `TekimaxProvider` filters these raw events and yields simplified chunks containing text deltas.

### Raw Events

If you need access to the raw events (e.g., `response.created`, `response.output_item.added`), you can use the low-level `TekimaxClient.sendMessageStream` method directly:

```typescript
import { TekimaxClient } from 'tekimax-ts'

const client = new TekimaxClient({ apiKey: '...' })

async function streamRaw() {
  const stream = client.sendMessageStream('Tell me a story', { model: 'gpt-4' })
  
  for await (const event of stream) {
    if (event.type === 'response.output_text.delta') {
      console.log('Delta:', event.delta)
    } else {
      console.log('Event Type:', event.type)
    }
  }
}
```

## Error Handling

Streaming can be interrupted by network issues. The async iterator will throw an error if the connection fails or if the stream is malformed. Ensure you wrap your loop in a `try/catch` block.

```typescript
try {
  for await (const chunk of provider.chatStream(...)) { ... }
} catch (error) {
  console.error('Stream interrupted:', error)
}
```
