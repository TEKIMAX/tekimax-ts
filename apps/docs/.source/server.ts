// @ts-nocheck
import * as __fd_glob_16 from "../content/docs/guides/thinking.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/guides/react.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/guides/multi-modal-workflows.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/adapters/openrouter.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/adapters/openai.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/adapters/ollama.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/adapters/grok.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/adapters/gemini.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/adapters/anthropic.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/security.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/modalities.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/error-handling.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/core.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/changelog.mdx?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/guides/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "guides/meta.json": __fd_glob_1, }, {"changelog.mdx": __fd_glob_2, "core.mdx": __fd_glob_3, "error-handling.mdx": __fd_glob_4, "index.mdx": __fd_glob_5, "modalities.mdx": __fd_glob_6, "security.mdx": __fd_glob_7, "adapters/anthropic.mdx": __fd_glob_8, "adapters/gemini.mdx": __fd_glob_9, "adapters/grok.mdx": __fd_glob_10, "adapters/ollama.mdx": __fd_glob_11, "adapters/openai.mdx": __fd_glob_12, "adapters/openrouter.mdx": __fd_glob_13, "guides/multi-modal-workflows.mdx": __fd_glob_14, "guides/react.mdx": __fd_glob_15, "guides/thinking.mdx": __fd_glob_16, });