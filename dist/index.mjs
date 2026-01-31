// src/gen/types.ts
var itemReferenceParamTypeEnum = {
  item_reference: "item_reference"
};
var reasoningSummaryContentParamTypeEnum = {
  summary_text: "summary_text"
};
var reasoningItemParamTypeEnum = {
  reasoning: "reasoning"
};
var inputTextContentParamTypeEnum = {
  input_text: "input_text"
};
var detailEnumEnum = {
  low: "low",
  high: "high",
  auto: "auto"
};
var imageDetailEnum = {
  low: "low",
  high: "high",
  auto: "auto"
};
var inputImageContentParamAutoParamTypeEnum = {
  input_image: "input_image"
};
var inputFileContentParamTypeEnum = {
  input_file: "input_file"
};
var userMessageItemParamTypeEnum = {
  message: "message"
};
var userMessageItemParamRoleEnum = {
  user: "user"
};
var systemMessageItemParamTypeEnum = {
  message: "message"
};
var systemMessageItemParamRoleEnum = {
  system: "system"
};
var developerMessageItemParamTypeEnum = {
  message: "message"
};
var developerMessageItemParamRoleEnum = {
  developer: "developer"
};
var urlCitationParamTypeEnum = {
  url_citation: "url_citation"
};
var outputTextContentParamTypeEnum = {
  output_text: "output_text"
};
var refusalContentParamTypeEnum = {
  refusal: "refusal"
};
var assistantMessageItemParamTypeEnum = {
  message: "message"
};
var assistantMessageItemParamRoleEnum = {
  assistant: "assistant"
};
var functionCallItemStatusEnum = {
  in_progress: "in_progress",
  completed: "completed",
  incomplete: "incomplete"
};
var functionCallStatusEnum = {
  in_progress: "in_progress",
  completed: "completed",
  incomplete: "incomplete"
};
var functionCallItemParamTypeEnum = {
  function_call: "function_call"
};
var inputVideoContentTypeEnum = {
  input_video: "input_video"
};
var functionCallOutputItemParamTypeEnum = {
  function_call_output: "function_call_output"
};
var includeEnumEnum = {
  "reasoning.encrypted_content": "reasoning.encrypted_content",
  "message.output_text.logprobs": "message.output_text.logprobs"
};
var functionToolParamTypeEnum = {
  function: "function"
};
var specificFunctionParamTypeEnum = {
  function: "function"
};
var toolChoiceValueEnumEnum = {
  none: "none",
  auto: "auto",
  required: "required"
};
var allowedToolsParamTypeEnum = {
  allowed_tools: "allowed_tools"
};
var verbosityEnumEnum = {
  low: "low",
  medium: "medium",
  high: "high"
};
var textResponseFormatTypeEnum = {
  text: "text"
};
var jsonSchemaResponseFormatParamTypeEnum = {
  json_schema: "json_schema"
};
var reasoningEffortEnumEnum = {
  none: "none",
  low: "low",
  medium: "medium",
  high: "high",
  xhigh: "xhigh"
};
var reasoningSummaryEnumEnum = {
  concise: "concise",
  detailed: "detailed",
  auto: "auto"
};
var truncationEnumEnum = {
  auto: "auto",
  disabled: "disabled"
};
var serviceTierEnumEnum = {
  auto: "auto",
  default: "default",
  flex: "flex",
  priority: "priority"
};
var messageRoleEnum = {
  user: "user",
  assistant: "assistant",
  system: "system",
  developer: "developer"
};
var inputTextContentTypeEnum = {
  input_text: "input_text"
};
var urlCitationBodyTypeEnum = {
  url_citation: "url_citation"
};
var outputTextContentTypeEnum = {
  output_text: "output_text"
};
var textContentTypeEnum = {
  text: "text"
};
var summaryTextContentTypeEnum = {
  summary_text: "summary_text"
};
var reasoningTextContentTypeEnum = {
  reasoning_text: "reasoning_text"
};
var refusalContentTypeEnum = {
  refusal: "refusal"
};
var inputImageContentTypeEnum = {
  input_image: "input_image"
};
var inputFileContentTypeEnum = {
  input_file: "input_file"
};
var messageStatusEnum = {
  in_progress: "in_progress",
  completed: "completed",
  incomplete: "incomplete"
};
var messageTypeEnum = {
  message: "message"
};
var functionCallTypeEnum = {
  function_call: "function_call"
};
var functionCallOutputStatusEnumEnum = {
  in_progress: "in_progress",
  completed: "completed",
  incomplete: "incomplete"
};
var functionCallOutputTypeEnum = {
  function_call_output: "function_call_output"
};
var reasoningBodyTypeEnum = {
  reasoning: "reasoning"
};
var functionToolTypeEnum = {
  function: "function"
};
var functionToolChoiceTypeEnum = {
  function: "function"
};
var allowedToolChoiceTypeEnum = {
  allowed_tools: "allowed_tools"
};
var jsonObjectResponseFormatTypeEnum = {
  json_object: "json_object"
};
var jsonSchemaResponseFormatTypeEnum = {
  json_schema: "json_schema"
};
var responseResourceObjectEnum = {
  response: "response"
};
var responseCreatedStreamingEventTypeEnum = {
  "response.created": "response.created"
};
var responseQueuedStreamingEventTypeEnum = {
  "response.queued": "response.queued"
};
var responseInProgressStreamingEventTypeEnum = {
  "response.in_progress": "response.in_progress"
};
var responseCompletedStreamingEventTypeEnum = {
  "response.completed": "response.completed"
};
var responseFailedStreamingEventTypeEnum = {
  "response.failed": "response.failed"
};
var responseIncompleteStreamingEventTypeEnum = {
  "response.incomplete": "response.incomplete"
};
var responseOutputItemAddedStreamingEventTypeEnum = {
  "response.output_item.added": "response.output_item.added"
};
var responseOutputItemDoneStreamingEventTypeEnum = {
  "response.output_item.done": "response.output_item.done"
};
var responseReasoningSummaryPartAddedStreamingEventTypeEnum = {
  "response.reasoning_summary_part.added": "response.reasoning_summary_part.added"
};
var responseReasoningSummaryPartDoneStreamingEventTypeEnum = {
  "response.reasoning_summary_part.done": "response.reasoning_summary_part.done"
};
var responseContentPartAddedStreamingEventTypeEnum = {
  "response.content_part.added": "response.content_part.added"
};
var responseContentPartDoneStreamingEventTypeEnum = {
  "response.content_part.done": "response.content_part.done"
};
var responseOutputTextDeltaStreamingEventTypeEnum = {
  "response.output_text.delta": "response.output_text.delta"
};
var responseOutputTextDoneStreamingEventTypeEnum = {
  "response.output_text.done": "response.output_text.done"
};
var responseRefusalDeltaStreamingEventTypeEnum = {
  "response.refusal.delta": "response.refusal.delta"
};
var responseRefusalDoneStreamingEventTypeEnum = {
  "response.refusal.done": "response.refusal.done"
};
var responseReasoningDeltaStreamingEventTypeEnum = {
  "response.reasoning.delta": "response.reasoning.delta"
};
var responseReasoningDoneStreamingEventTypeEnum = {
  "response.reasoning.done": "response.reasoning.done"
};
var responseReasoningSummaryDeltaStreamingEventTypeEnum = {
  "response.reasoning_summary_text.delta": "response.reasoning_summary_text.delta"
};
var responseReasoningSummaryDoneStreamingEventTypeEnum = {
  "response.reasoning_summary_text.done": "response.reasoning_summary_text.done"
};
var responseOutputTextAnnotationAddedStreamingEventTypeEnum = {
  "response.output_text.annotation.added": "response.output_text.annotation.added"
};
var responseFunctionCallArgumentsDeltaStreamingEventTypeEnum = {
  "response.function_call_arguments.delta": "response.function_call_arguments.delta"
};
var responseFunctionCallArgumentsDoneStreamingEventTypeEnum = {
  "response.function_call_arguments.done": "response.function_call_arguments.done"
};
var errorStreamingEventTypeEnum = {
  error: "error"
};

// src/gen/zod/functionToolChoiceSchema.ts
import { z } from "zod";
var functionToolChoiceSchema = z.object({
  "type": z.enum(["function"]).default("function"),
  "name": z.optional(z.string())
});

// src/gen/zod/toolChoiceValueEnumSchema.ts
import { z as z2 } from "zod";
var toolChoiceValueEnumSchema = z2.enum(["none", "auto", "required"]);

// src/gen/zod/allowedToolChoiceSchema.ts
import { z as z3 } from "zod";
var allowedToolChoiceSchema = z3.object({
  "type": z3.enum(["allowed_tools"]).default("allowed_tools"),
  "tools": z3.array(z3.lazy(() => functionToolChoiceSchema)),
  "mode": z3.lazy(() => toolChoiceValueEnumSchema)
});

// src/gen/zod/specificFunctionParamSchema.ts
import { z as z4 } from "zod";
var specificFunctionParamSchema = z4.object({
  "type": z4.enum(["function"]).default("function").describe("The tool to call. Always `function`."),
  "name": z4.string().describe("The name of the function tool to call.")
});

// src/gen/zod/specificToolChoiceParamSchema.ts
import { z as z5 } from "zod";
var specificToolChoiceParamSchema = z5.lazy(() => specificFunctionParamSchema);

// src/gen/zod/allowedToolsParamSchema.ts
import { z as z6 } from "zod";
var allowedToolsParamSchema = z6.object({
  "type": z6.enum(["allowed_tools"]).default("allowed_tools").describe("The tool choice type. Always `allowed_tools`."),
  "tools": z6.array(z6.lazy(() => specificToolChoiceParamSchema)).min(1).max(128).describe("The list of tools that are permitted for this request."),
  "mode": z6.optional(z6.lazy(() => toolChoiceValueEnumSchema).and(z6.any()))
});

// src/gen/zod/urlCitationBodySchema.ts
import { z as z7 } from "zod";
var urlCitationBodySchema = z7.object({
  "type": z7.enum(["url_citation"]).default("url_citation").describe("The type of the URL citation. Always `url_citation`."),
  "url": z7.string().describe("The URL of the web resource."),
  "start_index": z7.number().int().describe("The index of the first character of the URL citation in the message."),
  "end_index": z7.number().int().describe("The index of the last character of the URL citation in the message."),
  "title": z7.string().describe("The title of the web resource.")
}).describe("A citation for a web resource used to generate a model response.");

// src/gen/zod/annotationSchema.ts
import { z as z8 } from "zod";
var annotationSchema = z8.lazy(() => urlCitationBodySchema).and(z8.object({
  "type": z8.literal("url_citation")
})).describe("An annotation that applies to a span of output text.");

// src/gen/zod/urlCitationParamSchema.ts
import { z as z9 } from "zod";
var urlCitationParamSchema = z9.object({
  "type": z9.enum(["url_citation"]).default("url_citation").describe("The citation type. Always `url_citation`."),
  "start_index": z9.number().int().min(0).describe("The index of the first character of the citation in the message."),
  "end_index": z9.number().int().min(0).describe("The index of the last character of the citation in the message."),
  "url": z9.string().describe("The URL of the cited resource."),
  "title": z9.string().describe("The title of the cited resource.")
});

// src/gen/zod/outputTextContentParamSchema.ts
import { z as z10 } from "zod";
var outputTextContentParamSchema = z10.object({
  "type": z10.enum(["output_text"]).default("output_text").describe("The content type. Always `output_text`."),
  "text": z10.string().max(10485760).describe("The text content."),
  "annotations": z10.optional(z10.array(z10.lazy(() => urlCitationParamSchema)).describe("Citations associated with the text content."))
});

// src/gen/zod/refusalContentParamSchema.ts
import { z as z11 } from "zod";
var refusalContentParamSchema = z11.object({
  "type": z11.enum(["refusal"]).default("refusal").describe("The content type. Always `refusal`."),
  "refusal": z11.string().max(10485760).describe("The refusal text.")
});

// src/gen/zod/assistantMessageItemParamSchema.ts
import { z as z12 } from "zod";
var assistantMessageItemParamSchema = z12.object({
  "id": z12.optional(z12.union([z12.string(), z12.null()])),
  "type": z12.enum(["message"]).default("message").describe("The item type. Always `message`."),
  "role": z12.enum(["assistant"]).default("assistant").describe("The role of the message author. Always `assistant`."),
  "content": z12.union([z12.array(z12.union([z12.lazy(() => outputTextContentParamSchema).and(z12.object({
    "type": z12.literal("output_text")
  })), z12.lazy(() => refusalContentParamSchema).and(z12.object({
    "type": z12.literal("refusal")
  }))]).describe("A piece of assistant message content, such as text or a refusal.")), z12.string()]).describe("The message content, as an array of content parts."),
  "status": z12.optional(z12.union([z12.string(), z12.null()]))
});

// src/gen/zod/includeEnumSchema.ts
import { z as z13 } from "zod";
var includeEnumSchema = z13.enum(["reasoning.encrypted_content", "message.output_text.logprobs"]);

// src/gen/zod/functionCallStatusSchema.ts
import { z as z14 } from "zod";
var functionCallStatusSchema = z14.enum(["in_progress", "completed", "incomplete"]);

// src/gen/zod/functionCallItemParamSchema.ts
import { z as z15 } from "zod";
var functionCallItemParamSchema = z15.object({
  "id": z15.optional(z15.union([z15.string(), z15.null()])),
  "call_id": z15.string().min(1).max(64).describe("The unique ID of the function tool call generated by the model."),
  "type": z15.enum(["function_call"]).default("function_call").describe("The item type. Always `function_call`."),
  "name": z15.string().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/).describe("The name of the function to call."),
  "arguments": z15.string().describe("The function arguments as a JSON string."),
  "status": z15.optional(z15.union([z15.lazy(() => functionCallStatusSchema).and(z15.any()), z15.null()]))
});

// src/gen/zod/inputFileContentParamSchema.ts
import { z as z16 } from "zod";
var inputFileContentParamSchema = z16.object({
  "type": z16.enum(["input_file"]).default("input_file").describe("The type of the input item. Always `input_file`."),
  "filename": z16.optional(z16.union([z16.string(), z16.null()])),
  "file_data": z16.optional(z16.union([z16.string(), z16.null()])),
  "file_url": z16.optional(z16.union([z16.string(), z16.null()]))
}).describe("A file input to the model.");

// src/gen/zod/imageDetailSchema.ts
import { z as z17 } from "zod";
var imageDetailSchema = z17.enum(["low", "high", "auto"]);

// src/gen/zod/inputImageContentParamAutoParamSchema.ts
import { z as z18 } from "zod";
var inputImageContentParamAutoParamSchema = z18.object({
  "type": z18.enum(["input_image"]).default("input_image").describe("The type of the input item. Always `input_image`."),
  "image_url": z18.optional(z18.union([z18.string(), z18.null()])),
  "detail": z18.optional(z18.union([z18.lazy(() => imageDetailSchema).and(z18.any()), z18.null()]))
}).describe("An image input to the model. Learn about [image inputs](/docs/guides/vision)");

// src/gen/zod/inputTextContentParamSchema.ts
import { z as z19 } from "zod";
var inputTextContentParamSchema = z19.object({
  "type": z19.enum(["input_text"]).default("input_text").describe("The type of the input item. Always `input_text`."),
  "text": z19.string().max(10485760).describe("The text input to the model.")
}).describe("A text input to the model.");

// src/gen/zod/inputVideoContentSchema.ts
import { z as z20 } from "zod";
var inputVideoContentSchema = z20.object({
  "type": z20.enum(["input_video"]).describe("The type of the input content. Always `input_video`."),
  "video_url": z20.string().describe("A base64 or remote url that resolves to a video file.")
}).describe("A content block representing a video input to the model.");

// src/gen/zod/functionCallOutputItemParamSchema.ts
import { z as z21 } from "zod";
var functionCallOutputItemParamSchema = z21.object({
  "id": z21.optional(z21.union([z21.string(), z21.null()])),
  "call_id": z21.string().min(1).max(64).describe("The unique ID of the function tool call generated by the model."),
  "type": z21.enum(["function_call_output"]).default("function_call_output").describe("The type of the function tool call output. Always `function_call_output`."),
  "output": z21.union([z21.array(z21.union([z21.lazy(() => inputTextContentParamSchema).and(z21.object({
    "type": z21.literal("input_text")
  })), z21.lazy(() => inputImageContentParamAutoParamSchema).and(z21.object({
    "type": z21.literal("input_image")
  })), z21.lazy(() => inputFileContentParamSchema).and(z21.object({
    "type": z21.literal("input_file")
  })), z21.lazy(() => inputVideoContentSchema).and(z21.object({
    "type": z21.literal("input_video")
  }))]).describe("A piece of message content, such as text, an image, or a file.")), z21.string()]).describe("Text, image, or file output of the function tool call."),
  "status": z21.optional(z21.union([z21.lazy(() => functionCallStatusSchema).and(z21.any()), z21.null()]))
}).describe("The output of a function tool call.");

// src/gen/zod/itemReferenceParamSchema.ts
import { z as z22 } from "zod";
var itemReferenceParamSchema = z22.object({
  "type": z22.optional(z22.union([z22.enum(["item_reference"]), z22.null()])),
  "id": z22.string().describe("The ID of the item to reference.")
}).describe("An internal identifier for an item to reference.");

// src/gen/zod/reasoningSummaryContentParamSchema.ts
import { z as z23 } from "zod";
var reasoningSummaryContentParamSchema = z23.object({
  "type": z23.enum(["summary_text"]).default("summary_text").describe("The content type. Always `summary_text`."),
  "text": z23.string().max(10485760).describe("The reasoning summary text.")
});

// src/gen/zod/reasoningItemParamSchema.ts
import { z as z24 } from "zod";
var reasoningItemParamSchema = z24.object({
  "id": z24.optional(z24.union([z24.string(), z24.null()])),
  "type": z24.enum(["reasoning"]).default("reasoning").describe("The item type. Always `reasoning`."),
  "summary": z24.array(z24.lazy(() => reasoningSummaryContentParamSchema)).describe("Reasoning summary content associated with this item."),
  "content": z24.optional(z24.null()),
  "encrypted_content": z24.optional(z24.union([z24.string(), z24.null()]))
});

// src/gen/zod/itemParamSchema.ts
import { z as z25 } from "zod";
var itemParamSchema = z25.union([z25.lazy(() => itemReferenceParamSchema).and(z25.object({
  "type": z25.literal("Item reference")
})), z25.lazy(() => reasoningItemParamSchema).and(z25.object({
  "type": z25.literal("reasoning")
})), z25.lazy(() => assistantMessageItemParamSchema).and(z25.object({
  "type": z25.literal("message")
})), z25.lazy(() => functionCallItemParamSchema).and(z25.object({
  "type": z25.literal("function_call")
})), z25.lazy(() => functionCallOutputItemParamSchema).and(z25.object({
  "type": z25.literal("function_call_output")
}))]);

// src/gen/zod/metadataParamSchema.ts
import { z as z26 } from "zod";
var metadataParamSchema = z26.object({}).catchall(z26.string().max(512)).describe("Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.\n        Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.");

// src/gen/zod/reasoningEffortEnumSchema.ts
import { z as z27 } from "zod";
var reasoningEffortEnumSchema = z27.enum(["none", "low", "medium", "high", "xhigh"]);

// src/gen/zod/reasoningSummaryEnumSchema.ts
import { z as z28 } from "zod";
var reasoningSummaryEnumSchema = z28.enum(["concise", "detailed", "auto"]);

// src/gen/zod/reasoningParamSchema.ts
import { z as z29 } from "zod";
var reasoningParamSchema = z29.object({
  "effort": z29.optional(z29.union([z29.lazy(() => reasoningEffortEnumSchema), z29.null()])),
  "summary": z29.optional(z29.union([z29.lazy(() => reasoningSummaryEnumSchema).and(z29.any()), z29.null()]))
}).describe("**gpt-5 and o-series models only** Configuration options for [reasoning models](https://platform.openai.com/docs/guides/reasoning).");

// src/gen/zod/emptyModelParamSchema.ts
import { z as z30 } from "zod";
var emptyModelParamSchema = z30.object({});

// src/gen/zod/functionToolParamSchema.ts
import { z as z31 } from "zod";
var functionToolParamSchema = z31.object({
  "name": z31.string().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/),
  "description": z31.optional(z31.union([z31.string(), z31.null()])),
  "parameters": z31.optional(z31.union([z31.lazy(() => emptyModelParamSchema), z31.null()])),
  "strict": z31.optional(z31.boolean()),
  "type": z31.enum(["function"]).default("function")
});

// src/gen/zod/responsesToolParamSchema.ts
import { z as z32 } from "zod";
var responsesToolParamSchema = z32.lazy(() => functionToolParamSchema).and(z32.object({
  "type": z32.literal("function")
}));

// src/gen/zod/serviceTierEnumSchema.ts
import { z as z33 } from "zod";
var serviceTierEnumSchema = z33.enum(["auto", "default", "flex", "priority"]);

// src/gen/zod/streamOptionsParamSchema.ts
import { z as z34 } from "zod";
var streamOptionsParamSchema = z34.object({
  "include_obfuscation": z34.optional(z34.boolean().describe("Whether to obfuscate sensitive information in streamed output. Defaults to `true`."))
}).describe("Options that control streamed response behavior.");

// src/gen/zod/jsonSchemaResponseFormatParamSchema.ts
import { z as z35 } from "zod";
var jsonSchemaResponseFormatParamSchema = z35.object({
  "type": z35.optional(z35.enum(["json_schema"]).describe("The type of response format being defined. Always `json_schema`.")),
  "description": z35.optional(z35.string().describe("A description of what the response format is for, used by the model to\ndetermine how to respond in the format.\n")),
  "name": z35.optional(z35.string().describe("The name of the response format. Must be a-z, A-Z, 0-9, or contain\nunderscores and dashes, with a maximum length of 64.\n")),
  "schema": z35.optional(z35.object({}).catchall(z35.any()).describe("The schema for the response format, described as a JSON Schema object.\n")),
  "strict": z35.optional(z35.union([z35.boolean(), z35.null()]))
});

// src/gen/zod/textResponseFormatSchema.ts
import { z as z36 } from "zod";
var textResponseFormatSchema = z36.object({
  "type": z36.enum(["text"]).default("text")
});

// src/gen/zod/textFormatParamSchema.ts
import { z as z37 } from "zod";
var textFormatParamSchema = z37.union([z37.lazy(() => textResponseFormatSchema), z37.lazy(() => jsonSchemaResponseFormatParamSchema)]);

// src/gen/zod/verbosityEnumSchema.ts
import { z as z38 } from "zod";
var verbosityEnumSchema = z38.enum(["low", "medium", "high"]);

// src/gen/zod/textParamSchema.ts
import { z as z39 } from "zod";
var textParamSchema = z39.object({
  "format": z39.optional(z39.union([z39.lazy(() => textFormatParamSchema), z39.null()]).describe("The format configuration for text output.")),
  "verbosity": z39.optional(z39.lazy(() => verbosityEnumSchema).and(z39.any()))
});

// src/gen/zod/toolChoiceParamSchema.ts
import { z as z40 } from "zod";
var toolChoiceParamSchema = z40.union([z40.lazy(() => specificToolChoiceParamSchema), z40.lazy(() => toolChoiceValueEnumSchema), z40.lazy(() => allowedToolsParamSchema)]).describe("Controls which tool the model should use, if any.");

// src/gen/zod/truncationEnumSchema.ts
import { z as z41 } from "zod";
var truncationEnumSchema = z41.enum(["auto", "disabled"]);

// src/gen/zod/createResponseBodySchema.ts
import { z as z42 } from "zod";
var createResponseBodySchema = z42.object({
  "model": z42.optional(z42.union([z42.string(), z42.null()])),
  "input": z42.optional(z42.union([z42.union([z42.array(z42.lazy(() => itemParamSchema)), z42.string()]), z42.null()])),
  "previous_response_id": z42.optional(z42.union([z42.string(), z42.null()])),
  "include": z42.optional(z42.array(z42.lazy(() => includeEnumSchema))),
  "tools": z42.optional(z42.union([z42.array(z42.lazy(() => responsesToolParamSchema)), z42.null()])),
  "tool_choice": z42.optional(z42.union([z42.lazy(() => toolChoiceParamSchema).and(z42.any()), z42.null()])),
  "metadata": z42.optional(z42.union([z42.lazy(() => metadataParamSchema).and(z42.any()), z42.null()])),
  "text": z42.optional(z42.union([z42.lazy(() => textParamSchema).and(z42.any()), z42.null()])),
  "temperature": z42.optional(z42.union([z42.number(), z42.null()])),
  "top_p": z42.optional(z42.union([z42.number(), z42.null()])),
  "presence_penalty": z42.optional(z42.union([z42.number(), z42.null()])),
  "frequency_penalty": z42.optional(z42.union([z42.number(), z42.null()])),
  "parallel_tool_calls": z42.optional(z42.union([z42.boolean(), z42.null()])),
  "stream": z42.optional(z42.boolean().describe("Whether to stream response events as server-sent events.")),
  "stream_options": z42.optional(z42.union([z42.lazy(() => streamOptionsParamSchema).and(z42.any()), z42.null()])),
  "background": z42.optional(z42.boolean().describe("Whether to run the request in the background and return immediately.")),
  "max_output_tokens": z42.optional(z42.union([z42.number().int(), z42.null()])),
  "max_tool_calls": z42.optional(z42.union([z42.number().int(), z42.null()])),
  "reasoning": z42.optional(z42.union([z42.lazy(() => reasoningParamSchema).and(z42.any()), z42.null()])),
  "safety_identifier": z42.optional(z42.union([z42.string(), z42.null()])),
  "prompt_cache_key": z42.optional(z42.union([z42.string(), z42.null()])),
  "truncation": z42.optional(z42.lazy(() => truncationEnumSchema).and(z42.any())),
  "instructions": z42.optional(z42.union([z42.string(), z42.null()])),
  "store": z42.optional(z42.boolean().describe("Whether to store the response so it can be retrieved later.")),
  "service_tier": z42.optional(z42.lazy(() => serviceTierEnumSchema).and(z42.any())),
  "top_logprobs": z42.optional(z42.union([z42.number().int(), z42.null()]))
});

// src/gen/zod/errorSchema.ts
import { z as z43 } from "zod";
var errorSchema = z43.object({
  "code": z43.string().describe("A machine-readable error code that was returned."),
  "message": z43.string().describe("A human-readable description of the error that was returned.")
}).describe("An error that occurred while generating the response.");

// src/gen/zod/incompleteDetailsSchema.ts
import { z as z44 } from "zod";
var incompleteDetailsSchema = z44.object({
  "reason": z44.string().describe("The reason the response could not be completed.")
}).describe("Details about why the response was incomplete.");

// src/gen/zod/functionCallOutputStatusEnumSchema.ts
import { z as z45 } from "zod";
var functionCallOutputStatusEnumSchema = z45.enum(["in_progress", "completed", "incomplete"]).describe("Similar to `FunctionCallStatus`. All three options are allowed here for compatibility, but because in practice these items will be provided by developers, only `completed` should be used.");

// src/gen/zod/inputFileContentSchema.ts
import { z as z46 } from "zod";
var inputFileContentSchema = z46.object({
  "type": z46.enum(["input_file"]).default("input_file").describe("The type of the input item. Always `input_file`."),
  "filename": z46.optional(z46.string().describe("The name of the file to be sent to the model.")),
  "file_url": z46.optional(z46.string().describe("The URL of the file to be sent to the model."))
}).describe("A file input to the model.");

// src/gen/zod/inputImageContentSchema.ts
import { z as z47 } from "zod";
var inputImageContentSchema = z47.object({
  "type": z47.enum(["input_image"]).default("input_image").describe("The type of the input item. Always `input_image`."),
  "image_url": z47.union([z47.string(), z47.null()]),
  "detail": z47.lazy(() => imageDetailSchema).and(z47.any())
}).describe("An image input to the model. Learn about [image inputs](/docs/guides/vision).");

// src/gen/zod/inputTextContentSchema.ts
import { z as z48 } from "zod";
var inputTextContentSchema = z48.object({
  "type": z48.enum(["input_text"]).default("input_text").describe("The type of the input item. Always `input_text`."),
  "text": z48.string().describe("The text input to the model.")
}).describe("A text input to the model.");

// src/gen/zod/functionCallOutputSchema.ts
import { z as z49 } from "zod";
var functionCallOutputSchema = z49.object({
  "type": z49.enum(["function_call_output"]).default("function_call_output").describe("The type of the function tool call output. Always `function_call_output`."),
  "id": z49.string().describe("The unique ID of the function tool call output. Populated when this item is returned via API."),
  "call_id": z49.string().describe("The unique ID of the function tool call generated by the model."),
  "output": z49.union([z49.array(z49.union([z49.lazy(() => inputTextContentSchema).and(z49.object({
    "type": z49.literal("input_text")
  })), z49.lazy(() => inputImageContentSchema).and(z49.object({
    "type": z49.literal("input_image")
  })), z49.lazy(() => inputFileContentSchema).and(z49.object({
    "type": z49.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")), z49.string()]),
  "status": z49.lazy(() => functionCallOutputStatusEnumSchema).and(z49.any())
}).describe("A function tool call output that was returned by the tool.");

// src/gen/zod/functionCallSchema.ts
import { z as z50 } from "zod";
var functionCallSchema = z50.object({
  "type": z50.enum(["function_call"]).default("function_call").describe("The type of the item. Always `function_call`."),
  "id": z50.string().describe("The unique ID of the function call item."),
  "call_id": z50.string().describe("The unique ID of the function tool call that was generated."),
  "name": z50.string().describe("The name of the function that was called."),
  "arguments": z50.string().describe("The arguments JSON string that was generated."),
  "status": z50.lazy(() => functionCallStatusSchema).and(z50.any())
}).describe("A function tool call that was generated by the model.");

// src/gen/zod/messageRoleSchema.ts
import { z as z51 } from "zod";
var messageRoleSchema = z51.enum(["user", "assistant", "system", "developer"]);

// src/gen/zod/messageStatusSchema.ts
import { z as z52 } from "zod";
var messageStatusSchema = z52.enum(["in_progress", "completed", "incomplete"]);

// src/gen/zod/topLogProbSchema.ts
import { z as z53 } from "zod";
var topLogProbSchema = z53.object({
  "token": z53.string(),
  "logprob": z53.number(),
  "bytes": z53.array(z53.number().int())
}).describe("The top log probability of a token.");

// src/gen/zod/logProbSchema.ts
import { z as z54 } from "zod";
var logProbSchema = z54.object({
  "token": z54.string(),
  "logprob": z54.number(),
  "bytes": z54.array(z54.number().int()),
  "top_logprobs": z54.array(z54.lazy(() => topLogProbSchema).describe("The top log probability of a token."))
}).describe("The log probability of a token.");

// src/gen/zod/outputTextContentSchema.ts
import { z as z55 } from "zod";
var outputTextContentSchema = z55.object({
  "type": z55.enum(["output_text"]).default("output_text").describe("The type of the output text. Always `output_text`."),
  "text": z55.string().describe("The text output from the model."),
  "annotations": z55.array(z55.lazy(() => annotationSchema).describe("An annotation that applies to a span of output text.")).describe("The annotations of the text output."),
  "logprobs": z55.array(z55.lazy(() => logProbSchema).describe("The log probability of a token."))
}).describe("A text output from the model.");

// src/gen/zod/reasoningTextContentSchema.ts
import { z as z56 } from "zod";
var reasoningTextContentSchema = z56.object({
  "type": z56.enum(["reasoning_text"]).default("reasoning_text").describe("The type of the reasoning text. Always `reasoning_text`."),
  "text": z56.string().describe("The reasoning text from the model.")
}).describe("Reasoning text from the model.");

// src/gen/zod/refusalContentSchema.ts
import { z as z57 } from "zod";
var refusalContentSchema = z57.object({
  "type": z57.enum(["refusal"]).default("refusal").describe("The type of the refusal. Always `refusal`."),
  "refusal": z57.string().describe("The refusal explanation from the model.")
}).describe("A refusal from the model.");

// src/gen/zod/summaryTextContentSchema.ts
import { z as z58 } from "zod";
var summaryTextContentSchema = z58.object({
  "type": z58.enum(["summary_text"]).default("summary_text").describe("The type of the object. Always `summary_text`."),
  "text": z58.string().describe("A summary of the reasoning output from the model so far.")
}).describe("A summary text from the model.");

// src/gen/zod/textContentSchema.ts
import { z as z59 } from "zod";
var textContentSchema = z59.object({
  "type": z59.enum(["text"]).default("text"),
  "text": z59.string()
}).describe("A text content.");

// src/gen/zod/messageSchema.ts
import { z as z60 } from "zod";
var messageSchema = z60.object({
  "type": z60.enum(["message"]).default("message").describe("The type of the message. Always set to `message`."),
  "id": z60.string().describe("The unique ID of the message."),
  "status": z60.lazy(() => messageStatusSchema).and(z60.any()),
  "role": z60.lazy(() => messageRoleSchema).and(z60.any()),
  "content": z60.array(z60.union([z60.lazy(() => inputTextContentSchema).and(z60.object({
    "type": z60.literal("input_text")
  })), z60.lazy(() => outputTextContentSchema).and(z60.object({
    "type": z60.literal("output_text")
  })), z60.lazy(() => textContentSchema).and(z60.object({
    "type": z60.literal("text")
  })), z60.lazy(() => summaryTextContentSchema).and(z60.object({
    "type": z60.literal("summary_text")
  })), z60.lazy(() => reasoningTextContentSchema).and(z60.object({
    "type": z60.literal("reasoning_text")
  })), z60.lazy(() => refusalContentSchema).and(z60.object({
    "type": z60.literal("refusal")
  })), z60.lazy(() => inputImageContentSchema).and(z60.object({
    "type": z60.literal("input_image")
  })), z60.lazy(() => inputFileContentSchema).and(z60.object({
    "type": z60.literal("input_file")
  })), z60.lazy(() => inputVideoContentSchema).and(z60.object({
    "type": z60.literal("input_video")
  }))]).describe("A content part that makes up an input or output item.")).describe("The content of the message")
}).describe("A message to or from the model.");

// src/gen/zod/reasoningBodySchema.ts
import { z as z61 } from "zod";
var reasoningBodySchema = z61.object({
  "type": z61.enum(["reasoning"]).default("reasoning").describe("The type of the item. Always `reasoning`."),
  "id": z61.string().describe("The unique ID of the reasoning item."),
  "content": z61.optional(z61.array(z61.union([z61.lazy(() => inputTextContentSchema).and(z61.object({
    "type": z61.literal("input_text")
  })), z61.lazy(() => outputTextContentSchema).and(z61.object({
    "type": z61.literal("output_text")
  })), z61.lazy(() => textContentSchema).and(z61.object({
    "type": z61.literal("text")
  })), z61.lazy(() => summaryTextContentSchema).and(z61.object({
    "type": z61.literal("summary_text")
  })), z61.lazy(() => reasoningTextContentSchema).and(z61.object({
    "type": z61.literal("reasoning_text")
  })), z61.lazy(() => refusalContentSchema).and(z61.object({
    "type": z61.literal("refusal")
  })), z61.lazy(() => inputImageContentSchema).and(z61.object({
    "type": z61.literal("input_image")
  })), z61.lazy(() => inputFileContentSchema).and(z61.object({
    "type": z61.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")).describe("The reasoning content that was generated.")),
  "summary": z61.array(z61.union([z61.lazy(() => inputTextContentSchema).and(z61.object({
    "type": z61.literal("input_text")
  })), z61.lazy(() => outputTextContentSchema).and(z61.object({
    "type": z61.literal("output_text")
  })), z61.lazy(() => textContentSchema).and(z61.object({
    "type": z61.literal("text")
  })), z61.lazy(() => summaryTextContentSchema).and(z61.object({
    "type": z61.literal("summary_text")
  })), z61.lazy(() => reasoningTextContentSchema).and(z61.object({
    "type": z61.literal("reasoning_text")
  })), z61.lazy(() => refusalContentSchema).and(z61.object({
    "type": z61.literal("refusal")
  })), z61.lazy(() => inputImageContentSchema).and(z61.object({
    "type": z61.literal("input_image")
  })), z61.lazy(() => inputFileContentSchema).and(z61.object({
    "type": z61.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")).describe("The reasoning summary content that was generated."),
  "encrypted_content": z61.optional(z61.string().describe("The encrypted reasoning content that was generated."))
}).describe("A reasoning item that was generated by the model.");

// src/gen/zod/itemFieldSchema.ts
import { z as z62 } from "zod";
var itemFieldSchema = z62.union([z62.lazy(() => messageSchema).and(z62.object({
  "type": z62.literal("message")
})), z62.lazy(() => functionCallSchema).and(z62.object({
  "type": z62.literal("function_call")
})), z62.lazy(() => functionCallOutputSchema).and(z62.object({
  "type": z62.literal("function_call_output")
})), z62.lazy(() => reasoningBodySchema).and(z62.object({
  "type": z62.literal("reasoning")
}))]).describe("An item representing a message, tool call, tool output, reasoning, or other response element.");

// src/gen/zod/reasoningSchema.ts
import { z as z63 } from "zod";
var reasoningSchema = z63.object({
  "effort": z63.union([z63.lazy(() => reasoningEffortEnumSchema), z63.null()]),
  "summary": z63.union([z63.lazy(() => reasoningSummaryEnumSchema).and(z63.any()), z63.null()])
}).describe("Reasoning configuration and metadata that were used for the response.");

// src/gen/zod/jsonObjectResponseFormatSchema.ts
import { z as z64 } from "zod";
var jsonObjectResponseFormatSchema = z64.object({
  "type": z64.enum(["json_object"]).default("json_object")
});

// src/gen/zod/jsonSchemaResponseFormatSchema.ts
import { z as z65 } from "zod";
var jsonSchemaResponseFormatSchema = z65.object({
  "type": z65.enum(["json_schema"]).default("json_schema"),
  "name": z65.string(),
  "description": z65.union([z65.string(), z65.null()]),
  "schema": z65.null(),
  "strict": z65.boolean()
});

// src/gen/zod/textFieldSchema.ts
import { z as z66 } from "zod";
var textFieldSchema = z66.object({
  "format": z66.union([z66.lazy(() => textResponseFormatSchema), z66.lazy(() => jsonObjectResponseFormatSchema), z66.lazy(() => jsonSchemaResponseFormatSchema)]),
  "verbosity": z66.optional(z66.lazy(() => verbosityEnumSchema))
});

// src/gen/zod/functionToolSchema.ts
import { z as z67 } from "zod";
var functionToolSchema = z67.object({
  "type": z67.enum(["function"]).default("function").describe("The type of the function tool. Always `function`."),
  "name": z67.string().describe("The name of the function to call."),
  "description": z67.union([z67.string(), z67.null()]),
  "parameters": z67.union([z67.object({}).catchall(z67.any()), z67.null()]),
  "strict": z67.union([z67.boolean(), z67.null()])
}).describe("Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).");

// src/gen/zod/toolSchema.ts
import { z as z68 } from "zod";
var toolSchema = z68.lazy(() => functionToolSchema).and(z68.object({
  "type": z68.literal("function")
})).describe("A tool that can be used to generate a response.");

// src/gen/zod/inputTokensDetailsSchema.ts
import { z as z69 } from "zod";
var inputTokensDetailsSchema = z69.object({
  "cached_tokens": z69.number().int().describe("The number of input tokens that were served from cache.")
}).describe("A breakdown of input token usage that was recorded.");

// src/gen/zod/outputTokensDetailsSchema.ts
import { z as z70 } from "zod";
var outputTokensDetailsSchema = z70.object({
  "reasoning_tokens": z70.number().int().describe("The number of output tokens that were attributed to reasoning.")
}).describe("A breakdown of output token usage that was recorded.");

// src/gen/zod/usageSchema.ts
import { z as z71 } from "zod";
var usageSchema = z71.object({
  "input_tokens": z71.number().int().describe("The number of input tokens that were used to generate the response."),
  "output_tokens": z71.number().int().describe("The number of output tokens that were generated by the model."),
  "total_tokens": z71.number().int().describe("The total number of tokens that were used."),
  "input_tokens_details": z71.lazy(() => inputTokensDetailsSchema).and(z71.any()),
  "output_tokens_details": z71.lazy(() => outputTokensDetailsSchema).and(z71.any())
}).describe("Token usage statistics that were recorded for the response.");

// src/gen/zod/responseResourceSchema.ts
import { z as z72 } from "zod";
var responseResourceSchema = z72.object({
  "id": z72.string().describe("The unique ID of the response that was created."),
  "object": z72.enum(["response"]).default("response").describe("The object type, which was always `response`."),
  "created_at": z72.number().int().describe("The Unix timestamp (in seconds) for when the response was created."),
  "completed_at": z72.union([z72.number().int(), z72.null()]),
  "status": z72.string().describe("The status that was set for the response."),
  "incomplete_details": z72.union([z72.lazy(() => incompleteDetailsSchema).and(z72.any()), z72.null()]),
  "model": z72.string().describe("The model that generated this response."),
  "previous_response_id": z72.union([z72.string(), z72.null()]),
  "instructions": z72.union([z72.string(), z72.null()]),
  "output": z72.array(z72.lazy(() => itemFieldSchema).describe("An item representing a message, tool call, tool output, reasoning, or other response element.")).describe("The output items that were generated by the model."),
  "error": z72.union([z72.lazy(() => errorSchema).and(z72.any()), z72.null()]),
  "tools": z72.array(z72.lazy(() => toolSchema).describe("A tool that can be used to generate a response.")).describe("The tools that were available to the model during response generation."),
  "tool_choice": z72.union([z72.lazy(() => functionToolChoiceSchema), z72.lazy(() => toolChoiceValueEnumSchema), z72.lazy(() => allowedToolChoiceSchema)]),
  "truncation": z72.lazy(() => truncationEnumSchema).and(z72.any()),
  "parallel_tool_calls": z72.boolean().describe("Whether the model was allowed to call multiple tools in parallel."),
  "text": z72.lazy(() => textFieldSchema).and(z72.any()),
  "top_p": z72.number().describe("The nucleus sampling parameter that was used for this response."),
  "presence_penalty": z72.number().describe("The presence penalty that was used to penalize new tokens based on whether they appear in the text so far."),
  "frequency_penalty": z72.number().describe("The frequency penalty that was used to penalize new tokens based on their frequency in the text so far."),
  "top_logprobs": z72.number().int().describe("The number of most likely tokens that were returned at each position, along with their log probabilities."),
  "temperature": z72.number().describe("The sampling temperature that was used for this response."),
  "reasoning": z72.union([z72.lazy(() => reasoningSchema).and(z72.any()), z72.null()]),
  "usage": z72.union([z72.lazy(() => usageSchema).and(z72.any()), z72.null()]),
  "max_output_tokens": z72.union([z72.number().int(), z72.null()]),
  "max_tool_calls": z72.union([z72.number().int(), z72.null()]),
  "store": z72.boolean().describe("Whether this response was stored so it can be retrieved later."),
  "background": z72.boolean().describe("Whether this request was run in the background."),
  "service_tier": z72.string().describe("The service tier that was used for this response."),
  "metadata": z72.any().describe("Developer-defined metadata that was associated with the response."),
  "safety_identifier": z72.union([z72.string(), z72.null()]),
  "prompt_cache_key": z72.union([z72.string(), z72.null()])
}).describe("The complete response object that was returned by the Responses API.");

// src/gen/zod/createresponseSchema.ts
import { z as z73 } from "zod";
var createresponse200Schema = z73.lazy(() => responseResourceSchema).describe("The complete response object that was returned by the Responses API.");
var createresponseMutationRequestSchema = z73.lazy(() => createResponseBodySchema);
var createresponseMutationResponseSchema = z73.lazy(() => createresponse200Schema);

// src/gen/zod/detailEnumSchema.ts
import { z as z74 } from "zod";
var detailEnumSchema = z74.enum(["low", "high", "auto"]);

// src/gen/zod/developerMessageItemParamSchema.ts
import { z as z75 } from "zod";
var developerMessageItemParamSchema = z75.object({
  "id": z75.optional(z75.union([z75.string(), z75.null()])),
  "type": z75.enum(["message"]).default("message").describe("The item type. Always `message`."),
  "role": z75.enum(["developer"]).default("developer").describe("The message role. Always `developer`."),
  "content": z75.union([z75.array(z75.lazy(() => inputTextContentParamSchema).and(z75.object({
    "type": z75.literal("input_text")
  }))), z75.string()]).describe("The message content, as an array of content parts."),
  "status": z75.optional(z75.union([z75.string(), z75.null()]))
});

// src/gen/zod/errorPayloadSchema.ts
import { z as z76 } from "zod";
var errorPayloadSchema = z76.object({
  "type": z76.string().describe("The error type that was emitted."),
  "code": z76.union([z76.string(), z76.null()]),
  "message": z76.string().describe("The human-readable error message that was emitted."),
  "param": z76.union([z76.string(), z76.null()]),
  "headers": z76.optional(z76.object({}).catchall(z76.string().describe("The header value that was emitted.")).describe("The response headers that were emitted with the error, if any."))
}).describe("An error payload that was emitted for a streaming error event.");

// src/gen/zod/errorStreamingEventSchema.ts
import { z as z77 } from "zod";
var errorStreamingEventSchema = z77.object({
  "type": z77.enum(["error"]).default("error").describe("The type of the event, always `error`."),
  "sequence_number": z77.number().int().describe("The sequence number of the event that was emitted."),
  "error": z77.lazy(() => errorPayloadSchema).and(z77.any())
}).describe("A streaming event that indicated an error was emitted.");

// src/gen/zod/functionCallItemStatusSchema.ts
import { z as z78 } from "zod";
var functionCallItemStatusSchema = z78.enum(["in_progress", "completed", "incomplete"]);

// src/gen/zod/responseCompletedStreamingEventSchema.ts
import { z as z79 } from "zod";
var responseCompletedStreamingEventSchema = z79.object({
  "type": z79.enum(["response.completed"]).default("response.completed").describe("The type of the event, always `response.completed`."),
  "sequence_number": z79.number().int().describe("The sequence number of the event that was emitted."),
  "response": z79.lazy(() => responseResourceSchema).and(z79.any())
}).describe("A streaming event that indicated the response was completed.");

// src/gen/zod/responseContentPartAddedStreamingEventSchema.ts
import { z as z80 } from "zod";
var responseContentPartAddedStreamingEventSchema = z80.object({
  "type": z80.enum(["response.content_part.added"]).default("response.content_part.added").describe("The type of the event, always `response.content_part.added`."),
  "sequence_number": z80.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z80.string().describe("The ID of the item that was updated."),
  "output_index": z80.number().int().describe("The index of the output item that was updated."),
  "content_index": z80.number().int().describe("The index of the content part that was added."),
  "part": z80.union([z80.lazy(() => inputTextContentSchema).and(z80.object({
    "type": z80.literal("input_text")
  })), z80.lazy(() => outputTextContentSchema).and(z80.object({
    "type": z80.literal("output_text")
  })), z80.lazy(() => textContentSchema).and(z80.object({
    "type": z80.literal("text")
  })), z80.lazy(() => summaryTextContentSchema).and(z80.object({
    "type": z80.literal("summary_text")
  })), z80.lazy(() => reasoningTextContentSchema).and(z80.object({
    "type": z80.literal("reasoning_text")
  })), z80.lazy(() => refusalContentSchema).and(z80.object({
    "type": z80.literal("refusal")
  })), z80.lazy(() => inputImageContentSchema).and(z80.object({
    "type": z80.literal("input_image")
  })), z80.lazy(() => inputFileContentSchema).and(z80.object({
    "type": z80.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")
}).describe("A streaming event that indicated a content part was added.");

// src/gen/zod/responseContentPartDoneStreamingEventSchema.ts
import { z as z81 } from "zod";
var responseContentPartDoneStreamingEventSchema = z81.object({
  "type": z81.enum(["response.content_part.done"]).default("response.content_part.done").describe("The type of the event, always `response.content_part.done`."),
  "sequence_number": z81.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z81.string().describe("The ID of the item that was updated."),
  "output_index": z81.number().int().describe("The index of the output item that was updated."),
  "content_index": z81.number().int().describe("The index of the content part that was completed."),
  "part": z81.union([z81.lazy(() => inputTextContentSchema).and(z81.object({
    "type": z81.literal("input_text")
  })), z81.lazy(() => outputTextContentSchema).and(z81.object({
    "type": z81.literal("output_text")
  })), z81.lazy(() => textContentSchema).and(z81.object({
    "type": z81.literal("text")
  })), z81.lazy(() => summaryTextContentSchema).and(z81.object({
    "type": z81.literal("summary_text")
  })), z81.lazy(() => reasoningTextContentSchema).and(z81.object({
    "type": z81.literal("reasoning_text")
  })), z81.lazy(() => refusalContentSchema).and(z81.object({
    "type": z81.literal("refusal")
  })), z81.lazy(() => inputImageContentSchema).and(z81.object({
    "type": z81.literal("input_image")
  })), z81.lazy(() => inputFileContentSchema).and(z81.object({
    "type": z81.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")
}).describe("A streaming event that indicated a content part was completed.");

// src/gen/zod/responseCreatedStreamingEventSchema.ts
import { z as z82 } from "zod";
var responseCreatedStreamingEventSchema = z82.object({
  "type": z82.enum(["response.created"]).default("response.created").describe("The type of the event, always `response.created`."),
  "sequence_number": z82.number().int().describe("The sequence number of the event that was emitted."),
  "response": z82.lazy(() => responseResourceSchema).and(z82.any())
}).describe("A streaming event that indicated the response was created.");

// src/gen/zod/responseFailedStreamingEventSchema.ts
import { z as z83 } from "zod";
var responseFailedStreamingEventSchema = z83.object({
  "type": z83.enum(["response.failed"]).default("response.failed").describe("The type of the event, always `response.failed`."),
  "sequence_number": z83.number().int().describe("The sequence number of the event that was emitted."),
  "response": z83.lazy(() => responseResourceSchema).and(z83.any())
}).describe("A streaming event that indicated the response had failed.");

// src/gen/zod/responseFunctionCallArgumentsDeltaStreamingEventSchema.ts
import { z as z84 } from "zod";
var responseFunctionCallArgumentsDeltaStreamingEventSchema = z84.object({
  "type": z84.enum(["response.function_call_arguments.delta"]).default("response.function_call_arguments.delta").describe("The type of the event, always `response.function_call_arguments.delta`."),
  "sequence_number": z84.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z84.string().describe("The ID of the tool call item that was updated."),
  "output_index": z84.number().int().describe("The index of the output item that was updated."),
  "delta": z84.string().describe("The arguments delta that was appended."),
  "obfuscation": z84.optional(z84.string().describe("An obfuscation string that was added to pad the event payload."))
}).describe("A streaming event that indicated function call arguments were incrementally added.");

// src/gen/zod/responseFunctionCallArgumentsDoneStreamingEventSchema.ts
import { z as z85 } from "zod";
var responseFunctionCallArgumentsDoneStreamingEventSchema = z85.object({
  "type": z85.enum(["response.function_call_arguments.done"]).default("response.function_call_arguments.done").describe("The type of the event, always `response.function_call_arguments.done`."),
  "sequence_number": z85.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z85.string().describe("The ID of the tool call item that was updated."),
  "output_index": z85.number().int().describe("The index of the output item that was updated."),
  "arguments": z85.string().describe("The final arguments string that was emitted.")
}).describe("A streaming event that indicated function call arguments were completed.");

// src/gen/zod/responseIncompleteStreamingEventSchema.ts
import { z as z86 } from "zod";
var responseIncompleteStreamingEventSchema = z86.object({
  "type": z86.enum(["response.incomplete"]).default("response.incomplete").describe("The type of the event, always `response.incomplete`."),
  "sequence_number": z86.number().int().describe("The sequence number of the event that was emitted."),
  "response": z86.lazy(() => responseResourceSchema).and(z86.any())
}).describe("A streaming event that indicated the response was incomplete.");

// src/gen/zod/responseInProgressStreamingEventSchema.ts
import { z as z87 } from "zod";
var responseInProgressStreamingEventSchema = z87.object({
  "type": z87.enum(["response.in_progress"]).default("response.in_progress").describe("The type of the event, always `response.in_progress`."),
  "sequence_number": z87.number().int().describe("The sequence number of the event that was emitted."),
  "response": z87.lazy(() => responseResourceSchema).and(z87.any())
}).describe("A streaming event that indicated the response was in progress.");

// src/gen/zod/responseOutputItemAddedStreamingEventSchema.ts
import { z as z88 } from "zod";
var responseOutputItemAddedStreamingEventSchema = z88.object({
  "type": z88.enum(["response.output_item.added"]).default("response.output_item.added").describe("The type of the event, always `response.output_item.added`."),
  "sequence_number": z88.number().int().describe("The sequence number of the event that was emitted."),
  "output_index": z88.number().int().describe("The index of the output item that was added."),
  "item": z88.union([z88.lazy(() => itemFieldSchema).and(z88.any()), z88.null()])
}).describe("A streaming event that indicated an output item was added to the response.");

// src/gen/zod/responseOutputItemDoneStreamingEventSchema.ts
import { z as z89 } from "zod";
var responseOutputItemDoneStreamingEventSchema = z89.object({
  "type": z89.enum(["response.output_item.done"]).default("response.output_item.done").describe("The type of the event, always `response.output_item.done`."),
  "sequence_number": z89.number().int().describe("The sequence number of the event that was emitted."),
  "output_index": z89.number().int().describe("The index of the output item that was completed."),
  "item": z89.union([z89.lazy(() => itemFieldSchema).and(z89.any()), z89.null()])
}).describe("A streaming event that indicated an output item was completed.");

// src/gen/zod/responseOutputTextAnnotationAddedStreamingEventSchema.ts
import { z as z90 } from "zod";
var responseOutputTextAnnotationAddedStreamingEventSchema = z90.object({
  "type": z90.enum(["response.output_text.annotation.added"]).default("response.output_text.annotation.added").describe("The type of the event, always `response.output_text.annotation.added`."),
  "sequence_number": z90.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z90.string().describe("The ID of the item that was updated."),
  "output_index": z90.number().int().describe("The index of the output item that was updated."),
  "content_index": z90.number().int().describe("The index of the output text content that was updated."),
  "annotation_index": z90.number().int().describe("The index of the annotation that was added."),
  "annotation": z90.union([z90.lazy(() => annotationSchema).and(z90.any()), z90.null()])
}).describe("A streaming event that indicated an output text annotation was added.");

// src/gen/zod/responseOutputTextDeltaStreamingEventSchema.ts
import { z as z91 } from "zod";
var responseOutputTextDeltaStreamingEventSchema = z91.object({
  "type": z91.enum(["response.output_text.delta"]).default("response.output_text.delta").describe("The type of the event, always `response.output_text.delta`."),
  "sequence_number": z91.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z91.string().describe("The ID of the item that was updated."),
  "output_index": z91.number().int().describe("The index of the output item that was updated."),
  "content_index": z91.number().int().describe("The index of the content part that was updated."),
  "delta": z91.string().describe("The text delta that was appended."),
  "logprobs": z91.array(z91.lazy(() => logProbSchema).describe("The log probability of a token.")).describe("The token log probabilities that were emitted with the delta, if any."),
  "obfuscation": z91.optional(z91.string().describe("An obfuscation string that was added to pad the event payload."))
}).describe("A streaming event that indicated output text was incrementally added.");

// src/gen/zod/responseOutputTextDoneStreamingEventSchema.ts
import { z as z92 } from "zod";
var responseOutputTextDoneStreamingEventSchema = z92.object({
  "type": z92.enum(["response.output_text.done"]).default("response.output_text.done").describe("The type of the event, always `response.output_text.done`."),
  "sequence_number": z92.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z92.string().describe("The ID of the item that was updated."),
  "output_index": z92.number().int().describe("The index of the output item that was updated."),
  "content_index": z92.number().int().describe("The index of the content part that was completed."),
  "text": z92.string().describe("The final text that was emitted."),
  "logprobs": z92.array(z92.lazy(() => logProbSchema).describe("The log probability of a token.")).describe("The token log probabilities that were emitted with the final text, if any.")
}).describe("A streaming event that indicated output text was completed.");

// src/gen/zod/responseQueuedStreamingEventSchema.ts
import { z as z93 } from "zod";
var responseQueuedStreamingEventSchema = z93.object({
  "type": z93.enum(["response.queued"]).default("response.queued").describe("The type of the event, always `response.queued`."),
  "sequence_number": z93.number().int().describe("The sequence number of the event that was emitted."),
  "response": z93.lazy(() => responseResourceSchema).and(z93.any())
}).describe("A streaming event that indicated the response was queued.");

// src/gen/zod/responseReasoningDeltaStreamingEventSchema.ts
import { z as z94 } from "zod";
var responseReasoningDeltaStreamingEventSchema = z94.object({
  "type": z94.enum(["response.reasoning.delta"]).default("response.reasoning.delta").describe("The type of the event, always `response.reasoning.delta`."),
  "sequence_number": z94.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z94.string().describe("The ID of the item that was updated."),
  "output_index": z94.number().int().describe("The index of the output item that was updated."),
  "content_index": z94.number().int().describe("The index of the reasoning content that was updated."),
  "delta": z94.string().describe("The reasoning text delta that was appended."),
  "obfuscation": z94.optional(z94.string().describe("An obfuscation string that was added to pad the event payload."))
}).describe("A streaming event that indicated reasoning text was incrementally added.");

// src/gen/zod/responseReasoningDoneStreamingEventSchema.ts
import { z as z95 } from "zod";
var responseReasoningDoneStreamingEventSchema = z95.object({
  "type": z95.enum(["response.reasoning.done"]).default("response.reasoning.done").describe("The type of the event, always `response.reasoning.done`."),
  "sequence_number": z95.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z95.string().describe("The ID of the item that was updated."),
  "output_index": z95.number().int().describe("The index of the output item that was updated."),
  "content_index": z95.number().int().describe("The index of the reasoning content that was completed."),
  "text": z95.string().describe("The final reasoning text that was emitted.")
}).describe("A streaming event that indicated reasoning text was completed.");

// src/gen/zod/responseReasoningSummaryDeltaStreamingEventSchema.ts
import { z as z96 } from "zod";
var responseReasoningSummaryDeltaStreamingEventSchema = z96.object({
  "type": z96.enum(["response.reasoning_summary_text.delta"]).default("response.reasoning_summary_text.delta").describe("The type of the event, always `response.reasoning_summary.delta`."),
  "sequence_number": z96.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z96.string().describe("The ID of the item that was updated."),
  "output_index": z96.number().int().describe("The index of the output item that was updated."),
  "summary_index": z96.number().int().describe("The index of the summary content that was updated."),
  "delta": z96.string().describe("The summary text delta that was appended."),
  "obfuscation": z96.optional(z96.string().describe("An obfuscation string that was added to pad the event payload."))
}).describe("A streaming event that indicated a reasoning summary was incrementally added.");

// src/gen/zod/responseReasoningSummaryDoneStreamingEventSchema.ts
import { z as z97 } from "zod";
var responseReasoningSummaryDoneStreamingEventSchema = z97.object({
  "type": z97.enum(["response.reasoning_summary_text.done"]).default("response.reasoning_summary_text.done").describe("The type of the event, always `response.reasoning_summary.done`."),
  "sequence_number": z97.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z97.string().describe("The ID of the item that was updated."),
  "output_index": z97.number().int().describe("The index of the output item that was updated."),
  "summary_index": z97.number().int().describe("The index of the summary content that was completed."),
  "text": z97.string().describe("The final summary text that was emitted.")
}).describe("A streaming event that indicated a reasoning summary was completed.");

// src/gen/zod/responseReasoningSummaryPartAddedStreamingEventSchema.ts
import { z as z98 } from "zod";
var responseReasoningSummaryPartAddedStreamingEventSchema = z98.object({
  "type": z98.enum(["response.reasoning_summary_part.added"]).default("response.reasoning_summary_part.added").describe("The type of the event, always `response.reasoning_summary_part.added`."),
  "sequence_number": z98.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z98.string().describe("The ID of the item that was updated."),
  "output_index": z98.number().int().describe("The index of the output item that was updated."),
  "summary_index": z98.number().int().describe("The index of the summary part that was added."),
  "part": z98.union([z98.lazy(() => inputTextContentSchema).and(z98.object({
    "type": z98.literal("input_text")
  })), z98.lazy(() => outputTextContentSchema).and(z98.object({
    "type": z98.literal("output_text")
  })), z98.lazy(() => textContentSchema).and(z98.object({
    "type": z98.literal("text")
  })), z98.lazy(() => summaryTextContentSchema).and(z98.object({
    "type": z98.literal("summary_text")
  })), z98.lazy(() => reasoningTextContentSchema).and(z98.object({
    "type": z98.literal("reasoning_text")
  })), z98.lazy(() => refusalContentSchema).and(z98.object({
    "type": z98.literal("refusal")
  })), z98.lazy(() => inputImageContentSchema).and(z98.object({
    "type": z98.literal("input_image")
  })), z98.lazy(() => inputFileContentSchema).and(z98.object({
    "type": z98.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")
}).describe("A streaming event that indicated a reasoning summary part was added.");

// src/gen/zod/responseReasoningSummaryPartDoneStreamingEventSchema.ts
import { z as z99 } from "zod";
var responseReasoningSummaryPartDoneStreamingEventSchema = z99.object({
  "type": z99.enum(["response.reasoning_summary_part.done"]).default("response.reasoning_summary_part.done").describe("The type of the event, always `response.reasoning_summary_part.done`."),
  "sequence_number": z99.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z99.string().describe("The ID of the item that was updated."),
  "output_index": z99.number().int().describe("The index of the output item that was updated."),
  "summary_index": z99.number().int().describe("The index of the summary part that was completed."),
  "part": z99.union([z99.lazy(() => inputTextContentSchema).and(z99.object({
    "type": z99.literal("input_text")
  })), z99.lazy(() => outputTextContentSchema).and(z99.object({
    "type": z99.literal("output_text")
  })), z99.lazy(() => textContentSchema).and(z99.object({
    "type": z99.literal("text")
  })), z99.lazy(() => summaryTextContentSchema).and(z99.object({
    "type": z99.literal("summary_text")
  })), z99.lazy(() => reasoningTextContentSchema).and(z99.object({
    "type": z99.literal("reasoning_text")
  })), z99.lazy(() => refusalContentSchema).and(z99.object({
    "type": z99.literal("refusal")
  })), z99.lazy(() => inputImageContentSchema).and(z99.object({
    "type": z99.literal("input_image")
  })), z99.lazy(() => inputFileContentSchema).and(z99.object({
    "type": z99.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")
}).describe("A streaming event that indicated a reasoning summary part was completed.");

// src/gen/zod/responseRefusalDeltaStreamingEventSchema.ts
import { z as z100 } from "zod";
var responseRefusalDeltaStreamingEventSchema = z100.object({
  "type": z100.enum(["response.refusal.delta"]).default("response.refusal.delta").describe("The type of the event, always `response.refusal.delta`."),
  "sequence_number": z100.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z100.string().describe("The ID of the item that was updated."),
  "output_index": z100.number().int().describe("The index of the output item that was updated."),
  "content_index": z100.number().int().describe("The index of the refusal content that was updated."),
  "delta": z100.string().describe("The refusal text delta that was appended.")
}).describe("A streaming event that indicated refusal text was incrementally added.");

// src/gen/zod/responseRefusalDoneStreamingEventSchema.ts
import { z as z101 } from "zod";
var responseRefusalDoneStreamingEventSchema = z101.object({
  "type": z101.enum(["response.refusal.done"]).default("response.refusal.done").describe("The type of the event, always `response.refusal.done`."),
  "sequence_number": z101.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": z101.string().describe("The ID of the item that was updated."),
  "output_index": z101.number().int().describe("The index of the output item that was updated."),
  "content_index": z101.number().int().describe("The index of the refusal content that was completed."),
  "refusal": z101.string().describe("The final refusal text that was emitted.")
}).describe("A streaming event that indicated refusal text was completed.");

// src/gen/zod/systemMessageItemParamSchema.ts
import { z as z102 } from "zod";
var systemMessageItemParamSchema = z102.object({
  "id": z102.optional(z102.union([z102.string(), z102.null()])),
  "type": z102.enum(["message"]).default("message").describe("The item type. Always `message`."),
  "role": z102.enum(["system"]).default("system").describe("The message role. Always `system`."),
  "content": z102.union([z102.array(z102.lazy(() => inputTextContentParamSchema).and(z102.object({
    "type": z102.literal("input_text")
  }))), z102.string()]).describe("The message content, as an array of content parts."),
  "status": z102.optional(z102.union([z102.string(), z102.null()]))
});

// src/gen/zod/userMessageItemParamSchema.ts
import { z as z103 } from "zod";
var userMessageItemParamSchema = z103.object({
  "id": z103.optional(z103.union([z103.string(), z103.null()])),
  "type": z103.enum(["message"]).default("message").describe("The item type. Always `message`."),
  "role": z103.enum(["user"]).default("user").describe("The message role. Always `user`."),
  "content": z103.union([z103.array(z103.union([z103.lazy(() => inputTextContentParamSchema).and(z103.object({
    "type": z103.literal("input_text")
  })), z103.lazy(() => inputImageContentParamAutoParamSchema).and(z103.object({
    "type": z103.literal("input_image")
  })), z103.lazy(() => inputFileContentParamSchema).and(z103.object({
    "type": z103.literal("input_file")
  }))]).describe("A piece of message content, such as text, an image, or a file.")), z103.string()]).describe("The message content, as an array of content parts."),
  "status": z103.optional(z103.union([z103.string(), z103.null()]))
});
export {
  allowedToolChoiceSchema,
  allowedToolChoiceTypeEnum,
  allowedToolsParamSchema,
  allowedToolsParamTypeEnum,
  annotationSchema,
  assistantMessageItemParamRoleEnum,
  assistantMessageItemParamSchema,
  assistantMessageItemParamTypeEnum,
  createResponseBodySchema,
  createresponse200Schema,
  createresponseMutationRequestSchema,
  createresponseMutationResponseSchema,
  detailEnumEnum,
  detailEnumSchema,
  developerMessageItemParamRoleEnum,
  developerMessageItemParamSchema,
  developerMessageItemParamTypeEnum,
  emptyModelParamSchema,
  errorPayloadSchema,
  errorSchema,
  errorStreamingEventSchema,
  errorStreamingEventTypeEnum,
  functionCallItemParamSchema,
  functionCallItemParamTypeEnum,
  functionCallItemStatusEnum,
  functionCallItemStatusSchema,
  functionCallOutputItemParamSchema,
  functionCallOutputItemParamTypeEnum,
  functionCallOutputSchema,
  functionCallOutputStatusEnumEnum,
  functionCallOutputStatusEnumSchema,
  functionCallOutputTypeEnum,
  functionCallSchema,
  functionCallStatusEnum,
  functionCallStatusSchema,
  functionCallTypeEnum,
  functionToolChoiceSchema,
  functionToolChoiceTypeEnum,
  functionToolParamSchema,
  functionToolParamTypeEnum,
  functionToolSchema,
  functionToolTypeEnum,
  imageDetailEnum,
  imageDetailSchema,
  includeEnumEnum,
  includeEnumSchema,
  incompleteDetailsSchema,
  inputFileContentParamSchema,
  inputFileContentParamTypeEnum,
  inputFileContentSchema,
  inputFileContentTypeEnum,
  inputImageContentParamAutoParamSchema,
  inputImageContentParamAutoParamTypeEnum,
  inputImageContentSchema,
  inputImageContentTypeEnum,
  inputTextContentParamSchema,
  inputTextContentParamTypeEnum,
  inputTextContentSchema,
  inputTextContentTypeEnum,
  inputTokensDetailsSchema,
  inputVideoContentSchema,
  inputVideoContentTypeEnum,
  itemFieldSchema,
  itemParamSchema,
  itemReferenceParamSchema,
  itemReferenceParamTypeEnum,
  jsonObjectResponseFormatSchema,
  jsonObjectResponseFormatTypeEnum,
  jsonSchemaResponseFormatParamSchema,
  jsonSchemaResponseFormatParamTypeEnum,
  jsonSchemaResponseFormatSchema,
  jsonSchemaResponseFormatTypeEnum,
  logProbSchema,
  messageRoleEnum,
  messageRoleSchema,
  messageSchema,
  messageStatusEnum,
  messageStatusSchema,
  messageTypeEnum,
  metadataParamSchema,
  outputTextContentParamSchema,
  outputTextContentParamTypeEnum,
  outputTextContentSchema,
  outputTextContentTypeEnum,
  outputTokensDetailsSchema,
  reasoningBodySchema,
  reasoningBodyTypeEnum,
  reasoningEffortEnumEnum,
  reasoningEffortEnumSchema,
  reasoningItemParamSchema,
  reasoningItemParamTypeEnum,
  reasoningParamSchema,
  reasoningSchema,
  reasoningSummaryContentParamSchema,
  reasoningSummaryContentParamTypeEnum,
  reasoningSummaryEnumEnum,
  reasoningSummaryEnumSchema,
  reasoningTextContentSchema,
  reasoningTextContentTypeEnum,
  refusalContentParamSchema,
  refusalContentParamTypeEnum,
  refusalContentSchema,
  refusalContentTypeEnum,
  responseCompletedStreamingEventSchema,
  responseCompletedStreamingEventTypeEnum,
  responseContentPartAddedStreamingEventSchema,
  responseContentPartAddedStreamingEventTypeEnum,
  responseContentPartDoneStreamingEventSchema,
  responseContentPartDoneStreamingEventTypeEnum,
  responseCreatedStreamingEventSchema,
  responseCreatedStreamingEventTypeEnum,
  responseFailedStreamingEventSchema,
  responseFailedStreamingEventTypeEnum,
  responseFunctionCallArgumentsDeltaStreamingEventSchema,
  responseFunctionCallArgumentsDeltaStreamingEventTypeEnum,
  responseFunctionCallArgumentsDoneStreamingEventSchema,
  responseFunctionCallArgumentsDoneStreamingEventTypeEnum,
  responseInProgressStreamingEventSchema,
  responseInProgressStreamingEventTypeEnum,
  responseIncompleteStreamingEventSchema,
  responseIncompleteStreamingEventTypeEnum,
  responseOutputItemAddedStreamingEventSchema,
  responseOutputItemAddedStreamingEventTypeEnum,
  responseOutputItemDoneStreamingEventSchema,
  responseOutputItemDoneStreamingEventTypeEnum,
  responseOutputTextAnnotationAddedStreamingEventSchema,
  responseOutputTextAnnotationAddedStreamingEventTypeEnum,
  responseOutputTextDeltaStreamingEventSchema,
  responseOutputTextDeltaStreamingEventTypeEnum,
  responseOutputTextDoneStreamingEventSchema,
  responseOutputTextDoneStreamingEventTypeEnum,
  responseQueuedStreamingEventSchema,
  responseQueuedStreamingEventTypeEnum,
  responseReasoningDeltaStreamingEventSchema,
  responseReasoningDeltaStreamingEventTypeEnum,
  responseReasoningDoneStreamingEventSchema,
  responseReasoningDoneStreamingEventTypeEnum,
  responseReasoningSummaryDeltaStreamingEventSchema,
  responseReasoningSummaryDeltaStreamingEventTypeEnum,
  responseReasoningSummaryDoneStreamingEventSchema,
  responseReasoningSummaryDoneStreamingEventTypeEnum,
  responseReasoningSummaryPartAddedStreamingEventSchema,
  responseReasoningSummaryPartAddedStreamingEventTypeEnum,
  responseReasoningSummaryPartDoneStreamingEventSchema,
  responseReasoningSummaryPartDoneStreamingEventTypeEnum,
  responseRefusalDeltaStreamingEventSchema,
  responseRefusalDeltaStreamingEventTypeEnum,
  responseRefusalDoneStreamingEventSchema,
  responseRefusalDoneStreamingEventTypeEnum,
  responseResourceObjectEnum,
  responseResourceSchema,
  responsesToolParamSchema,
  serviceTierEnumEnum,
  serviceTierEnumSchema,
  specificFunctionParamSchema,
  specificFunctionParamTypeEnum,
  specificToolChoiceParamSchema,
  streamOptionsParamSchema,
  summaryTextContentSchema,
  summaryTextContentTypeEnum,
  systemMessageItemParamRoleEnum,
  systemMessageItemParamSchema,
  systemMessageItemParamTypeEnum,
  textContentSchema,
  textContentTypeEnum,
  textFieldSchema,
  textFormatParamSchema,
  textParamSchema,
  textResponseFormatSchema,
  textResponseFormatTypeEnum,
  toolChoiceParamSchema,
  toolChoiceValueEnumEnum,
  toolChoiceValueEnumSchema,
  toolSchema,
  topLogProbSchema,
  truncationEnumEnum,
  truncationEnumSchema,
  urlCitationBodySchema,
  urlCitationBodyTypeEnum,
  urlCitationParamSchema,
  urlCitationParamTypeEnum,
  usageSchema,
  userMessageItemParamRoleEnum,
  userMessageItemParamSchema,
  userMessageItemParamTypeEnum,
  verbosityEnumEnum,
  verbosityEnumSchema
};
