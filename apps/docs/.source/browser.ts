// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"core.mdx": () => import("../content/docs/core.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "security.mdx": () => import("../content/docs/security.mdx?collection=docs"), "adapters/anthropic.mdx": () => import("../content/docs/adapters/anthropic.mdx?collection=docs"), "adapters/gemini.mdx": () => import("../content/docs/adapters/gemini.mdx?collection=docs"), "adapters/grok.mdx": () => import("../content/docs/adapters/grok.mdx?collection=docs"), "adapters/ollama.mdx": () => import("../content/docs/adapters/ollama.mdx?collection=docs"), "adapters/openai.mdx": () => import("../content/docs/adapters/openai.mdx?collection=docs"), "adapters/openrouter.mdx": () => import("../content/docs/adapters/openrouter.mdx?collection=docs"), }),
};
export default browserCollections;