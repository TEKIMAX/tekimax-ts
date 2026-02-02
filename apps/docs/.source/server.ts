// @ts-nocheck
import * as __fd_glob_8 from "../content/docs/adapters/openrouter.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/adapters/openai.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/adapters/ollama.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/adapters/grok.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/adapters/gemini.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/adapters/anthropic.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/security.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/core.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {}, {"core.mdx": __fd_glob_0, "index.mdx": __fd_glob_1, "security.mdx": __fd_glob_2, "adapters/anthropic.mdx": __fd_glob_3, "adapters/gemini.mdx": __fd_glob_4, "adapters/grok.mdx": __fd_glob_5, "adapters/ollama.mdx": __fd_glob_6, "adapters/openai.mdx": __fd_glob_7, "adapters/openrouter.mdx": __fd_glob_8, });