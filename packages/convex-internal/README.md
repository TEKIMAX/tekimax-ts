# @tekimax/convex (Internal)

> ⚠️ **This package is private and NOT published to npm.**

Internal Convex AI agent & workflow features for the Tekimax platform. Extends the public `tekimax-ts` SDK with proprietary capabilities.

## What lives where

| Feature | Package | Visibility |
|---|---|---|
| ConvexManager (provisioning) | `tekimax-ts` | ✅ Public / Open Source |
| AI Agent runtime | `@tekimax/convex` | 🔒 Internal |
| Workflow orchestration | `@tekimax/convex` | 🔒 Internal |
| RAG pipeline helpers | `@tekimax/convex` | 🔒 Internal |
| Deployable templates | `@tekimax/convex` | 🔒 Internal |

## Usage (internal apps only)

```typescript
import { ConvexManager } from '@tekimax/convex'
// Future: import { AgentRunner, WorkflowEngine } from '@tekimax/convex'
```

## Development

```bash
# From monorepo root
npx turbo build --filter=@tekimax/convex
```
