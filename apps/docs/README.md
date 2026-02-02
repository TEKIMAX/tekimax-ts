# Tekimax Documentation

The official documentation for the **Tekimax Universal AI Adapter Layer**.

## 📚 Overview

This site serves as the single source of truth for the Tekimax SDK ecosystem. It covers:
- **Core Concepts**: Agentic loops, items, state machines.
- **Modalities**: Text, Image, Audio, Video interfaces.
- **Adapters**: Guides and API references for `tekimax-ts`.

## 🛠️ Stack

Built with:
- **[Fumadocs](https://fumadocs.vercel.app)**: Best-in-class documentation framework for Next.js.
- **[Next.js 14+](https://nextjs.org)**: Server-side rendering and static export.
- **[Tailwind CSS](https://tailwindcss.com)**: Styling.
- **[Shiki](https://shiki.style)**: Syntax highlighting.

## 🚀 Development

We use `npm` (monorepo root uses `pnpm`, but this workspace works with `npm` in isolation or via `turbo`).

```bash
# From root
npm run dev --workspace=apps/docs

# From apps/docs
cd apps/docs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🚢 Deployment

Deployed to **Cloudflare Pages**.
- **Production**: `https://docs.tekimax.com`
- **Output**: Static export (`output: 'export'` in `next.config.mjs`).

## 📝 Content Management

Documentation content lives in `content/docs`.
- Format: MDX
- Frontmatter: `title`, `description` (Required)

