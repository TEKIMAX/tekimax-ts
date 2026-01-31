"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/gen/index.ts
var index_exports = {};
__export(index_exports, {
  allowedToolChoiceSchema: () => allowedToolChoiceSchema,
  allowedToolChoiceTypeEnum: () => allowedToolChoiceTypeEnum,
  allowedToolsParamSchema: () => allowedToolsParamSchema,
  allowedToolsParamTypeEnum: () => allowedToolsParamTypeEnum,
  annotationSchema: () => annotationSchema,
  assistantMessageItemParamRoleEnum: () => assistantMessageItemParamRoleEnum,
  assistantMessageItemParamSchema: () => assistantMessageItemParamSchema,
  assistantMessageItemParamTypeEnum: () => assistantMessageItemParamTypeEnum,
  createResponseBodySchema: () => createResponseBodySchema,
  createresponse200Schema: () => createresponse200Schema,
  createresponseMutationRequestSchema: () => createresponseMutationRequestSchema,
  createresponseMutationResponseSchema: () => createresponseMutationResponseSchema,
  detailEnumEnum: () => detailEnumEnum,
  detailEnumSchema: () => detailEnumSchema,
  developerMessageItemParamRoleEnum: () => developerMessageItemParamRoleEnum,
  developerMessageItemParamSchema: () => developerMessageItemParamSchema,
  developerMessageItemParamTypeEnum: () => developerMessageItemParamTypeEnum,
  emptyModelParamSchema: () => emptyModelParamSchema,
  errorPayloadSchema: () => errorPayloadSchema,
  errorSchema: () => errorSchema,
  errorStreamingEventSchema: () => errorStreamingEventSchema,
  errorStreamingEventTypeEnum: () => errorStreamingEventTypeEnum,
  functionCallItemParamSchema: () => functionCallItemParamSchema,
  functionCallItemParamTypeEnum: () => functionCallItemParamTypeEnum,
  functionCallItemStatusEnum: () => functionCallItemStatusEnum,
  functionCallItemStatusSchema: () => functionCallItemStatusSchema,
  functionCallOutputItemParamSchema: () => functionCallOutputItemParamSchema,
  functionCallOutputItemParamTypeEnum: () => functionCallOutputItemParamTypeEnum,
  functionCallOutputSchema: () => functionCallOutputSchema,
  functionCallOutputStatusEnumEnum: () => functionCallOutputStatusEnumEnum,
  functionCallOutputStatusEnumSchema: () => functionCallOutputStatusEnumSchema,
  functionCallOutputTypeEnum: () => functionCallOutputTypeEnum,
  functionCallSchema: () => functionCallSchema,
  functionCallStatusEnum: () => functionCallStatusEnum,
  functionCallStatusSchema: () => functionCallStatusSchema,
  functionCallTypeEnum: () => functionCallTypeEnum,
  functionToolChoiceSchema: () => functionToolChoiceSchema,
  functionToolChoiceTypeEnum: () => functionToolChoiceTypeEnum,
  functionToolParamSchema: () => functionToolParamSchema,
  functionToolParamTypeEnum: () => functionToolParamTypeEnum,
  functionToolSchema: () => functionToolSchema,
  functionToolTypeEnum: () => functionToolTypeEnum,
  imageDetailEnum: () => imageDetailEnum,
  imageDetailSchema: () => imageDetailSchema,
  includeEnumEnum: () => includeEnumEnum,
  includeEnumSchema: () => includeEnumSchema,
  incompleteDetailsSchema: () => incompleteDetailsSchema,
  inputFileContentParamSchema: () => inputFileContentParamSchema,
  inputFileContentParamTypeEnum: () => inputFileContentParamTypeEnum,
  inputFileContentSchema: () => inputFileContentSchema,
  inputFileContentTypeEnum: () => inputFileContentTypeEnum,
  inputImageContentParamAutoParamSchema: () => inputImageContentParamAutoParamSchema,
  inputImageContentParamAutoParamTypeEnum: () => inputImageContentParamAutoParamTypeEnum,
  inputImageContentSchema: () => inputImageContentSchema,
  inputImageContentTypeEnum: () => inputImageContentTypeEnum,
  inputTextContentParamSchema: () => inputTextContentParamSchema,
  inputTextContentParamTypeEnum: () => inputTextContentParamTypeEnum,
  inputTextContentSchema: () => inputTextContentSchema,
  inputTextContentTypeEnum: () => inputTextContentTypeEnum,
  inputTokensDetailsSchema: () => inputTokensDetailsSchema,
  inputVideoContentSchema: () => inputVideoContentSchema,
  inputVideoContentTypeEnum: () => inputVideoContentTypeEnum,
  itemFieldSchema: () => itemFieldSchema,
  itemParamSchema: () => itemParamSchema,
  itemReferenceParamSchema: () => itemReferenceParamSchema,
  itemReferenceParamTypeEnum: () => itemReferenceParamTypeEnum,
  jsonObjectResponseFormatSchema: () => jsonObjectResponseFormatSchema,
  jsonObjectResponseFormatTypeEnum: () => jsonObjectResponseFormatTypeEnum,
  jsonSchemaResponseFormatParamSchema: () => jsonSchemaResponseFormatParamSchema,
  jsonSchemaResponseFormatParamTypeEnum: () => jsonSchemaResponseFormatParamTypeEnum,
  jsonSchemaResponseFormatSchema: () => jsonSchemaResponseFormatSchema,
  jsonSchemaResponseFormatTypeEnum: () => jsonSchemaResponseFormatTypeEnum,
  logProbSchema: () => logProbSchema,
  messageRoleEnum: () => messageRoleEnum,
  messageRoleSchema: () => messageRoleSchema,
  messageSchema: () => messageSchema,
  messageStatusEnum: () => messageStatusEnum,
  messageStatusSchema: () => messageStatusSchema,
  messageTypeEnum: () => messageTypeEnum,
  metadataParamSchema: () => metadataParamSchema,
  outputTextContentParamSchema: () => outputTextContentParamSchema,
  outputTextContentParamTypeEnum: () => outputTextContentParamTypeEnum,
  outputTextContentSchema: () => outputTextContentSchema,
  outputTextContentTypeEnum: () => outputTextContentTypeEnum,
  outputTokensDetailsSchema: () => outputTokensDetailsSchema,
  reasoningBodySchema: () => reasoningBodySchema,
  reasoningBodyTypeEnum: () => reasoningBodyTypeEnum,
  reasoningEffortEnumEnum: () => reasoningEffortEnumEnum,
  reasoningEffortEnumSchema: () => reasoningEffortEnumSchema,
  reasoningItemParamSchema: () => reasoningItemParamSchema,
  reasoningItemParamTypeEnum: () => reasoningItemParamTypeEnum,
  reasoningParamSchema: () => reasoningParamSchema,
  reasoningSchema: () => reasoningSchema,
  reasoningSummaryContentParamSchema: () => reasoningSummaryContentParamSchema,
  reasoningSummaryContentParamTypeEnum: () => reasoningSummaryContentParamTypeEnum,
  reasoningSummaryEnumEnum: () => reasoningSummaryEnumEnum,
  reasoningSummaryEnumSchema: () => reasoningSummaryEnumSchema,
  reasoningTextContentSchema: () => reasoningTextContentSchema,
  reasoningTextContentTypeEnum: () => reasoningTextContentTypeEnum,
  refusalContentParamSchema: () => refusalContentParamSchema,
  refusalContentParamTypeEnum: () => refusalContentParamTypeEnum,
  refusalContentSchema: () => refusalContentSchema,
  refusalContentTypeEnum: () => refusalContentTypeEnum,
  responseCompletedStreamingEventSchema: () => responseCompletedStreamingEventSchema,
  responseCompletedStreamingEventTypeEnum: () => responseCompletedStreamingEventTypeEnum,
  responseContentPartAddedStreamingEventSchema: () => responseContentPartAddedStreamingEventSchema,
  responseContentPartAddedStreamingEventTypeEnum: () => responseContentPartAddedStreamingEventTypeEnum,
  responseContentPartDoneStreamingEventSchema: () => responseContentPartDoneStreamingEventSchema,
  responseContentPartDoneStreamingEventTypeEnum: () => responseContentPartDoneStreamingEventTypeEnum,
  responseCreatedStreamingEventSchema: () => responseCreatedStreamingEventSchema,
  responseCreatedStreamingEventTypeEnum: () => responseCreatedStreamingEventTypeEnum,
  responseFailedStreamingEventSchema: () => responseFailedStreamingEventSchema,
  responseFailedStreamingEventTypeEnum: () => responseFailedStreamingEventTypeEnum,
  responseFunctionCallArgumentsDeltaStreamingEventSchema: () => responseFunctionCallArgumentsDeltaStreamingEventSchema,
  responseFunctionCallArgumentsDeltaStreamingEventTypeEnum: () => responseFunctionCallArgumentsDeltaStreamingEventTypeEnum,
  responseFunctionCallArgumentsDoneStreamingEventSchema: () => responseFunctionCallArgumentsDoneStreamingEventSchema,
  responseFunctionCallArgumentsDoneStreamingEventTypeEnum: () => responseFunctionCallArgumentsDoneStreamingEventTypeEnum,
  responseInProgressStreamingEventSchema: () => responseInProgressStreamingEventSchema,
  responseInProgressStreamingEventTypeEnum: () => responseInProgressStreamingEventTypeEnum,
  responseIncompleteStreamingEventSchema: () => responseIncompleteStreamingEventSchema,
  responseIncompleteStreamingEventTypeEnum: () => responseIncompleteStreamingEventTypeEnum,
  responseOutputItemAddedStreamingEventSchema: () => responseOutputItemAddedStreamingEventSchema,
  responseOutputItemAddedStreamingEventTypeEnum: () => responseOutputItemAddedStreamingEventTypeEnum,
  responseOutputItemDoneStreamingEventSchema: () => responseOutputItemDoneStreamingEventSchema,
  responseOutputItemDoneStreamingEventTypeEnum: () => responseOutputItemDoneStreamingEventTypeEnum,
  responseOutputTextAnnotationAddedStreamingEventSchema: () => responseOutputTextAnnotationAddedStreamingEventSchema,
  responseOutputTextAnnotationAddedStreamingEventTypeEnum: () => responseOutputTextAnnotationAddedStreamingEventTypeEnum,
  responseOutputTextDeltaStreamingEventSchema: () => responseOutputTextDeltaStreamingEventSchema,
  responseOutputTextDeltaStreamingEventTypeEnum: () => responseOutputTextDeltaStreamingEventTypeEnum,
  responseOutputTextDoneStreamingEventSchema: () => responseOutputTextDoneStreamingEventSchema,
  responseOutputTextDoneStreamingEventTypeEnum: () => responseOutputTextDoneStreamingEventTypeEnum,
  responseQueuedStreamingEventSchema: () => responseQueuedStreamingEventSchema,
  responseQueuedStreamingEventTypeEnum: () => responseQueuedStreamingEventTypeEnum,
  responseReasoningDeltaStreamingEventSchema: () => responseReasoningDeltaStreamingEventSchema,
  responseReasoningDeltaStreamingEventTypeEnum: () => responseReasoningDeltaStreamingEventTypeEnum,
  responseReasoningDoneStreamingEventSchema: () => responseReasoningDoneStreamingEventSchema,
  responseReasoningDoneStreamingEventTypeEnum: () => responseReasoningDoneStreamingEventTypeEnum,
  responseReasoningSummaryDeltaStreamingEventSchema: () => responseReasoningSummaryDeltaStreamingEventSchema,
  responseReasoningSummaryDeltaStreamingEventTypeEnum: () => responseReasoningSummaryDeltaStreamingEventTypeEnum,
  responseReasoningSummaryDoneStreamingEventSchema: () => responseReasoningSummaryDoneStreamingEventSchema,
  responseReasoningSummaryDoneStreamingEventTypeEnum: () => responseReasoningSummaryDoneStreamingEventTypeEnum,
  responseReasoningSummaryPartAddedStreamingEventSchema: () => responseReasoningSummaryPartAddedStreamingEventSchema,
  responseReasoningSummaryPartAddedStreamingEventTypeEnum: () => responseReasoningSummaryPartAddedStreamingEventTypeEnum,
  responseReasoningSummaryPartDoneStreamingEventSchema: () => responseReasoningSummaryPartDoneStreamingEventSchema,
  responseReasoningSummaryPartDoneStreamingEventTypeEnum: () => responseReasoningSummaryPartDoneStreamingEventTypeEnum,
  responseRefusalDeltaStreamingEventSchema: () => responseRefusalDeltaStreamingEventSchema,
  responseRefusalDeltaStreamingEventTypeEnum: () => responseRefusalDeltaStreamingEventTypeEnum,
  responseRefusalDoneStreamingEventSchema: () => responseRefusalDoneStreamingEventSchema,
  responseRefusalDoneStreamingEventTypeEnum: () => responseRefusalDoneStreamingEventTypeEnum,
  responseResourceObjectEnum: () => responseResourceObjectEnum,
  responseResourceSchema: () => responseResourceSchema,
  responsesToolParamSchema: () => responsesToolParamSchema,
  serviceTierEnumEnum: () => serviceTierEnumEnum,
  serviceTierEnumSchema: () => serviceTierEnumSchema,
  specificFunctionParamSchema: () => specificFunctionParamSchema,
  specificFunctionParamTypeEnum: () => specificFunctionParamTypeEnum,
  specificToolChoiceParamSchema: () => specificToolChoiceParamSchema,
  streamOptionsParamSchema: () => streamOptionsParamSchema,
  summaryTextContentSchema: () => summaryTextContentSchema,
  summaryTextContentTypeEnum: () => summaryTextContentTypeEnum,
  systemMessageItemParamRoleEnum: () => systemMessageItemParamRoleEnum,
  systemMessageItemParamSchema: () => systemMessageItemParamSchema,
  systemMessageItemParamTypeEnum: () => systemMessageItemParamTypeEnum,
  textContentSchema: () => textContentSchema,
  textContentTypeEnum: () => textContentTypeEnum,
  textFieldSchema: () => textFieldSchema,
  textFormatParamSchema: () => textFormatParamSchema,
  textParamSchema: () => textParamSchema,
  textResponseFormatSchema: () => textResponseFormatSchema,
  textResponseFormatTypeEnum: () => textResponseFormatTypeEnum,
  toolChoiceParamSchema: () => toolChoiceParamSchema,
  toolChoiceValueEnumEnum: () => toolChoiceValueEnumEnum,
  toolChoiceValueEnumSchema: () => toolChoiceValueEnumSchema,
  toolSchema: () => toolSchema,
  topLogProbSchema: () => topLogProbSchema,
  truncationEnumEnum: () => truncationEnumEnum,
  truncationEnumSchema: () => truncationEnumSchema,
  urlCitationBodySchema: () => urlCitationBodySchema,
  urlCitationBodyTypeEnum: () => urlCitationBodyTypeEnum,
  urlCitationParamSchema: () => urlCitationParamSchema,
  urlCitationParamTypeEnum: () => urlCitationParamTypeEnum,
  usageSchema: () => usageSchema,
  userMessageItemParamRoleEnum: () => userMessageItemParamRoleEnum,
  userMessageItemParamSchema: () => userMessageItemParamSchema,
  userMessageItemParamTypeEnum: () => userMessageItemParamTypeEnum,
  verbosityEnumEnum: () => verbosityEnumEnum,
  verbosityEnumSchema: () => verbosityEnumSchema
});
module.exports = __toCommonJS(index_exports);

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
var import_zod = require("zod");
var functionToolChoiceSchema = import_zod.z.object({
  "type": import_zod.z.enum(["function"]).default("function"),
  "name": import_zod.z.optional(import_zod.z.string())
});

// src/gen/zod/toolChoiceValueEnumSchema.ts
var import_zod2 = require("zod");
var toolChoiceValueEnumSchema = import_zod2.z.enum(["none", "auto", "required"]);

// src/gen/zod/allowedToolChoiceSchema.ts
var import_zod3 = require("zod");
var allowedToolChoiceSchema = import_zod3.z.object({
  "type": import_zod3.z.enum(["allowed_tools"]).default("allowed_tools"),
  "tools": import_zod3.z.array(import_zod3.z.lazy(() => functionToolChoiceSchema)),
  "mode": import_zod3.z.lazy(() => toolChoiceValueEnumSchema)
});

// src/gen/zod/specificFunctionParamSchema.ts
var import_zod4 = require("zod");
var specificFunctionParamSchema = import_zod4.z.object({
  "type": import_zod4.z.enum(["function"]).default("function").describe("The tool to call. Always `function`."),
  "name": import_zod4.z.string().describe("The name of the function tool to call.")
});

// src/gen/zod/specificToolChoiceParamSchema.ts
var import_zod5 = require("zod");
var specificToolChoiceParamSchema = import_zod5.z.lazy(() => specificFunctionParamSchema);

// src/gen/zod/allowedToolsParamSchema.ts
var import_zod6 = require("zod");
var allowedToolsParamSchema = import_zod6.z.object({
  "type": import_zod6.z.enum(["allowed_tools"]).default("allowed_tools").describe("The tool choice type. Always `allowed_tools`."),
  "tools": import_zod6.z.array(import_zod6.z.lazy(() => specificToolChoiceParamSchema)).min(1).max(128).describe("The list of tools that are permitted for this request."),
  "mode": import_zod6.z.optional(import_zod6.z.lazy(() => toolChoiceValueEnumSchema).and(import_zod6.z.any()))
});

// src/gen/zod/urlCitationBodySchema.ts
var import_zod7 = require("zod");
var urlCitationBodySchema = import_zod7.z.object({
  "type": import_zod7.z.enum(["url_citation"]).default("url_citation").describe("The type of the URL citation. Always `url_citation`."),
  "url": import_zod7.z.string().describe("The URL of the web resource."),
  "start_index": import_zod7.z.number().int().describe("The index of the first character of the URL citation in the message."),
  "end_index": import_zod7.z.number().int().describe("The index of the last character of the URL citation in the message."),
  "title": import_zod7.z.string().describe("The title of the web resource.")
}).describe("A citation for a web resource used to generate a model response.");

// src/gen/zod/annotationSchema.ts
var import_zod8 = require("zod");
var annotationSchema = import_zod8.z.lazy(() => urlCitationBodySchema).and(import_zod8.z.object({
  "type": import_zod8.z.literal("url_citation")
})).describe("An annotation that applies to a span of output text.");

// src/gen/zod/urlCitationParamSchema.ts
var import_zod9 = require("zod");
var urlCitationParamSchema = import_zod9.z.object({
  "type": import_zod9.z.enum(["url_citation"]).default("url_citation").describe("The citation type. Always `url_citation`."),
  "start_index": import_zod9.z.number().int().min(0).describe("The index of the first character of the citation in the message."),
  "end_index": import_zod9.z.number().int().min(0).describe("The index of the last character of the citation in the message."),
  "url": import_zod9.z.string().describe("The URL of the cited resource."),
  "title": import_zod9.z.string().describe("The title of the cited resource.")
});

// src/gen/zod/outputTextContentParamSchema.ts
var import_zod10 = require("zod");
var outputTextContentParamSchema = import_zod10.z.object({
  "type": import_zod10.z.enum(["output_text"]).default("output_text").describe("The content type. Always `output_text`."),
  "text": import_zod10.z.string().max(10485760).describe("The text content."),
  "annotations": import_zod10.z.optional(import_zod10.z.array(import_zod10.z.lazy(() => urlCitationParamSchema)).describe("Citations associated with the text content."))
});

// src/gen/zod/refusalContentParamSchema.ts
var import_zod11 = require("zod");
var refusalContentParamSchema = import_zod11.z.object({
  "type": import_zod11.z.enum(["refusal"]).default("refusal").describe("The content type. Always `refusal`."),
  "refusal": import_zod11.z.string().max(10485760).describe("The refusal text.")
});

// src/gen/zod/assistantMessageItemParamSchema.ts
var import_zod12 = require("zod");
var assistantMessageItemParamSchema = import_zod12.z.object({
  "id": import_zod12.z.optional(import_zod12.z.union([import_zod12.z.string(), import_zod12.z.null()])),
  "type": import_zod12.z.enum(["message"]).default("message").describe("The item type. Always `message`."),
  "role": import_zod12.z.enum(["assistant"]).default("assistant").describe("The role of the message author. Always `assistant`."),
  "content": import_zod12.z.union([import_zod12.z.array(import_zod12.z.union([import_zod12.z.lazy(() => outputTextContentParamSchema).and(import_zod12.z.object({
    "type": import_zod12.z.literal("output_text")
  })), import_zod12.z.lazy(() => refusalContentParamSchema).and(import_zod12.z.object({
    "type": import_zod12.z.literal("refusal")
  }))]).describe("A piece of assistant message content, such as text or a refusal.")), import_zod12.z.string()]).describe("The message content, as an array of content parts."),
  "status": import_zod12.z.optional(import_zod12.z.union([import_zod12.z.string(), import_zod12.z.null()]))
});

// src/gen/zod/includeEnumSchema.ts
var import_zod13 = require("zod");
var includeEnumSchema = import_zod13.z.enum(["reasoning.encrypted_content", "message.output_text.logprobs"]);

// src/gen/zod/functionCallStatusSchema.ts
var import_zod14 = require("zod");
var functionCallStatusSchema = import_zod14.z.enum(["in_progress", "completed", "incomplete"]);

// src/gen/zod/functionCallItemParamSchema.ts
var import_zod15 = require("zod");
var functionCallItemParamSchema = import_zod15.z.object({
  "id": import_zod15.z.optional(import_zod15.z.union([import_zod15.z.string(), import_zod15.z.null()])),
  "call_id": import_zod15.z.string().min(1).max(64).describe("The unique ID of the function tool call generated by the model."),
  "type": import_zod15.z.enum(["function_call"]).default("function_call").describe("The item type. Always `function_call`."),
  "name": import_zod15.z.string().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/).describe("The name of the function to call."),
  "arguments": import_zod15.z.string().describe("The function arguments as a JSON string."),
  "status": import_zod15.z.optional(import_zod15.z.union([import_zod15.z.lazy(() => functionCallStatusSchema).and(import_zod15.z.any()), import_zod15.z.null()]))
});

// src/gen/zod/inputFileContentParamSchema.ts
var import_zod16 = require("zod");
var inputFileContentParamSchema = import_zod16.z.object({
  "type": import_zod16.z.enum(["input_file"]).default("input_file").describe("The type of the input item. Always `input_file`."),
  "filename": import_zod16.z.optional(import_zod16.z.union([import_zod16.z.string(), import_zod16.z.null()])),
  "file_data": import_zod16.z.optional(import_zod16.z.union([import_zod16.z.string(), import_zod16.z.null()])),
  "file_url": import_zod16.z.optional(import_zod16.z.union([import_zod16.z.string(), import_zod16.z.null()]))
}).describe("A file input to the model.");

// src/gen/zod/imageDetailSchema.ts
var import_zod17 = require("zod");
var imageDetailSchema = import_zod17.z.enum(["low", "high", "auto"]);

// src/gen/zod/inputImageContentParamAutoParamSchema.ts
var import_zod18 = require("zod");
var inputImageContentParamAutoParamSchema = import_zod18.z.object({
  "type": import_zod18.z.enum(["input_image"]).default("input_image").describe("The type of the input item. Always `input_image`."),
  "image_url": import_zod18.z.optional(import_zod18.z.union([import_zod18.z.string(), import_zod18.z.null()])),
  "detail": import_zod18.z.optional(import_zod18.z.union([import_zod18.z.lazy(() => imageDetailSchema).and(import_zod18.z.any()), import_zod18.z.null()]))
}).describe("An image input to the model. Learn about [image inputs](/docs/guides/vision)");

// src/gen/zod/inputTextContentParamSchema.ts
var import_zod19 = require("zod");
var inputTextContentParamSchema = import_zod19.z.object({
  "type": import_zod19.z.enum(["input_text"]).default("input_text").describe("The type of the input item. Always `input_text`."),
  "text": import_zod19.z.string().max(10485760).describe("The text input to the model.")
}).describe("A text input to the model.");

// src/gen/zod/inputVideoContentSchema.ts
var import_zod20 = require("zod");
var inputVideoContentSchema = import_zod20.z.object({
  "type": import_zod20.z.enum(["input_video"]).describe("The type of the input content. Always `input_video`."),
  "video_url": import_zod20.z.string().describe("A base64 or remote url that resolves to a video file.")
}).describe("A content block representing a video input to the model.");

// src/gen/zod/functionCallOutputItemParamSchema.ts
var import_zod21 = require("zod");
var functionCallOutputItemParamSchema = import_zod21.z.object({
  "id": import_zod21.z.optional(import_zod21.z.union([import_zod21.z.string(), import_zod21.z.null()])),
  "call_id": import_zod21.z.string().min(1).max(64).describe("The unique ID of the function tool call generated by the model."),
  "type": import_zod21.z.enum(["function_call_output"]).default("function_call_output").describe("The type of the function tool call output. Always `function_call_output`."),
  "output": import_zod21.z.union([import_zod21.z.array(import_zod21.z.union([import_zod21.z.lazy(() => inputTextContentParamSchema).and(import_zod21.z.object({
    "type": import_zod21.z.literal("input_text")
  })), import_zod21.z.lazy(() => inputImageContentParamAutoParamSchema).and(import_zod21.z.object({
    "type": import_zod21.z.literal("input_image")
  })), import_zod21.z.lazy(() => inputFileContentParamSchema).and(import_zod21.z.object({
    "type": import_zod21.z.literal("input_file")
  })), import_zod21.z.lazy(() => inputVideoContentSchema).and(import_zod21.z.object({
    "type": import_zod21.z.literal("input_video")
  }))]).describe("A piece of message content, such as text, an image, or a file.")), import_zod21.z.string()]).describe("Text, image, or file output of the function tool call."),
  "status": import_zod21.z.optional(import_zod21.z.union([import_zod21.z.lazy(() => functionCallStatusSchema).and(import_zod21.z.any()), import_zod21.z.null()]))
}).describe("The output of a function tool call.");

// src/gen/zod/itemReferenceParamSchema.ts
var import_zod22 = require("zod");
var itemReferenceParamSchema = import_zod22.z.object({
  "type": import_zod22.z.optional(import_zod22.z.union([import_zod22.z.enum(["item_reference"]), import_zod22.z.null()])),
  "id": import_zod22.z.string().describe("The ID of the item to reference.")
}).describe("An internal identifier for an item to reference.");

// src/gen/zod/reasoningSummaryContentParamSchema.ts
var import_zod23 = require("zod");
var reasoningSummaryContentParamSchema = import_zod23.z.object({
  "type": import_zod23.z.enum(["summary_text"]).default("summary_text").describe("The content type. Always `summary_text`."),
  "text": import_zod23.z.string().max(10485760).describe("The reasoning summary text.")
});

// src/gen/zod/reasoningItemParamSchema.ts
var import_zod24 = require("zod");
var reasoningItemParamSchema = import_zod24.z.object({
  "id": import_zod24.z.optional(import_zod24.z.union([import_zod24.z.string(), import_zod24.z.null()])),
  "type": import_zod24.z.enum(["reasoning"]).default("reasoning").describe("The item type. Always `reasoning`."),
  "summary": import_zod24.z.array(import_zod24.z.lazy(() => reasoningSummaryContentParamSchema)).describe("Reasoning summary content associated with this item."),
  "content": import_zod24.z.optional(import_zod24.z.null()),
  "encrypted_content": import_zod24.z.optional(import_zod24.z.union([import_zod24.z.string(), import_zod24.z.null()]))
});

// src/gen/zod/itemParamSchema.ts
var import_zod25 = require("zod");
var itemParamSchema = import_zod25.z.union([import_zod25.z.lazy(() => itemReferenceParamSchema).and(import_zod25.z.object({
  "type": import_zod25.z.literal("Item reference")
})), import_zod25.z.lazy(() => reasoningItemParamSchema).and(import_zod25.z.object({
  "type": import_zod25.z.literal("reasoning")
})), import_zod25.z.lazy(() => assistantMessageItemParamSchema).and(import_zod25.z.object({
  "type": import_zod25.z.literal("message")
})), import_zod25.z.lazy(() => functionCallItemParamSchema).and(import_zod25.z.object({
  "type": import_zod25.z.literal("function_call")
})), import_zod25.z.lazy(() => functionCallOutputItemParamSchema).and(import_zod25.z.object({
  "type": import_zod25.z.literal("function_call_output")
}))]);

// src/gen/zod/metadataParamSchema.ts
var import_zod26 = require("zod");
var metadataParamSchema = import_zod26.z.object({}).catchall(import_zod26.z.string().max(512)).describe("Set of 16 key-value pairs that can be attached to an object. This can be         useful for storing additional information about the object in a structured         format, and querying for objects via API or the dashboard.\n        Keys are strings with a maximum length of 64 characters. Values are strings         with a maximum length of 512 characters.");

// src/gen/zod/reasoningEffortEnumSchema.ts
var import_zod27 = require("zod");
var reasoningEffortEnumSchema = import_zod27.z.enum(["none", "low", "medium", "high", "xhigh"]);

// src/gen/zod/reasoningSummaryEnumSchema.ts
var import_zod28 = require("zod");
var reasoningSummaryEnumSchema = import_zod28.z.enum(["concise", "detailed", "auto"]);

// src/gen/zod/reasoningParamSchema.ts
var import_zod29 = require("zod");
var reasoningParamSchema = import_zod29.z.object({
  "effort": import_zod29.z.optional(import_zod29.z.union([import_zod29.z.lazy(() => reasoningEffortEnumSchema), import_zod29.z.null()])),
  "summary": import_zod29.z.optional(import_zod29.z.union([import_zod29.z.lazy(() => reasoningSummaryEnumSchema).and(import_zod29.z.any()), import_zod29.z.null()]))
}).describe("**gpt-5 and o-series models only** Configuration options for [reasoning models](https://platform.openai.com/docs/guides/reasoning).");

// src/gen/zod/emptyModelParamSchema.ts
var import_zod30 = require("zod");
var emptyModelParamSchema = import_zod30.z.object({});

// src/gen/zod/functionToolParamSchema.ts
var import_zod31 = require("zod");
var functionToolParamSchema = import_zod31.z.object({
  "name": import_zod31.z.string().min(1).max(64).regex(/^[a-zA-Z0-9_-]+$/),
  "description": import_zod31.z.optional(import_zod31.z.union([import_zod31.z.string(), import_zod31.z.null()])),
  "parameters": import_zod31.z.optional(import_zod31.z.union([import_zod31.z.lazy(() => emptyModelParamSchema), import_zod31.z.null()])),
  "strict": import_zod31.z.optional(import_zod31.z.boolean()),
  "type": import_zod31.z.enum(["function"]).default("function")
});

// src/gen/zod/responsesToolParamSchema.ts
var import_zod32 = require("zod");
var responsesToolParamSchema = import_zod32.z.lazy(() => functionToolParamSchema).and(import_zod32.z.object({
  "type": import_zod32.z.literal("function")
}));

// src/gen/zod/serviceTierEnumSchema.ts
var import_zod33 = require("zod");
var serviceTierEnumSchema = import_zod33.z.enum(["auto", "default", "flex", "priority"]);

// src/gen/zod/streamOptionsParamSchema.ts
var import_zod34 = require("zod");
var streamOptionsParamSchema = import_zod34.z.object({
  "include_obfuscation": import_zod34.z.optional(import_zod34.z.boolean().describe("Whether to obfuscate sensitive information in streamed output. Defaults to `true`."))
}).describe("Options that control streamed response behavior.");

// src/gen/zod/jsonSchemaResponseFormatParamSchema.ts
var import_zod35 = require("zod");
var jsonSchemaResponseFormatParamSchema = import_zod35.z.object({
  "type": import_zod35.z.optional(import_zod35.z.enum(["json_schema"]).describe("The type of response format being defined. Always `json_schema`.")),
  "description": import_zod35.z.optional(import_zod35.z.string().describe("A description of what the response format is for, used by the model to\ndetermine how to respond in the format.\n")),
  "name": import_zod35.z.optional(import_zod35.z.string().describe("The name of the response format. Must be a-z, A-Z, 0-9, or contain\nunderscores and dashes, with a maximum length of 64.\n")),
  "schema": import_zod35.z.optional(import_zod35.z.object({}).catchall(import_zod35.z.any()).describe("The schema for the response format, described as a JSON Schema object.\n")),
  "strict": import_zod35.z.optional(import_zod35.z.union([import_zod35.z.boolean(), import_zod35.z.null()]))
});

// src/gen/zod/textResponseFormatSchema.ts
var import_zod36 = require("zod");
var textResponseFormatSchema = import_zod36.z.object({
  "type": import_zod36.z.enum(["text"]).default("text")
});

// src/gen/zod/textFormatParamSchema.ts
var import_zod37 = require("zod");
var textFormatParamSchema = import_zod37.z.union([import_zod37.z.lazy(() => textResponseFormatSchema), import_zod37.z.lazy(() => jsonSchemaResponseFormatParamSchema)]);

// src/gen/zod/verbosityEnumSchema.ts
var import_zod38 = require("zod");
var verbosityEnumSchema = import_zod38.z.enum(["low", "medium", "high"]);

// src/gen/zod/textParamSchema.ts
var import_zod39 = require("zod");
var textParamSchema = import_zod39.z.object({
  "format": import_zod39.z.optional(import_zod39.z.union([import_zod39.z.lazy(() => textFormatParamSchema), import_zod39.z.null()]).describe("The format configuration for text output.")),
  "verbosity": import_zod39.z.optional(import_zod39.z.lazy(() => verbosityEnumSchema).and(import_zod39.z.any()))
});

// src/gen/zod/toolChoiceParamSchema.ts
var import_zod40 = require("zod");
var toolChoiceParamSchema = import_zod40.z.union([import_zod40.z.lazy(() => specificToolChoiceParamSchema), import_zod40.z.lazy(() => toolChoiceValueEnumSchema), import_zod40.z.lazy(() => allowedToolsParamSchema)]).describe("Controls which tool the model should use, if any.");

// src/gen/zod/truncationEnumSchema.ts
var import_zod41 = require("zod");
var truncationEnumSchema = import_zod41.z.enum(["auto", "disabled"]);

// src/gen/zod/createResponseBodySchema.ts
var import_zod42 = require("zod");
var createResponseBodySchema = import_zod42.z.object({
  "model": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.string(), import_zod42.z.null()])),
  "input": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.union([import_zod42.z.array(import_zod42.z.lazy(() => itemParamSchema)), import_zod42.z.string()]), import_zod42.z.null()])),
  "previous_response_id": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.string(), import_zod42.z.null()])),
  "include": import_zod42.z.optional(import_zod42.z.array(import_zod42.z.lazy(() => includeEnumSchema))),
  "tools": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.array(import_zod42.z.lazy(() => responsesToolParamSchema)), import_zod42.z.null()])),
  "tool_choice": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.lazy(() => toolChoiceParamSchema).and(import_zod42.z.any()), import_zod42.z.null()])),
  "metadata": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.lazy(() => metadataParamSchema).and(import_zod42.z.any()), import_zod42.z.null()])),
  "text": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.lazy(() => textParamSchema).and(import_zod42.z.any()), import_zod42.z.null()])),
  "temperature": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.number(), import_zod42.z.null()])),
  "top_p": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.number(), import_zod42.z.null()])),
  "presence_penalty": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.number(), import_zod42.z.null()])),
  "frequency_penalty": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.number(), import_zod42.z.null()])),
  "parallel_tool_calls": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.boolean(), import_zod42.z.null()])),
  "stream": import_zod42.z.optional(import_zod42.z.boolean().describe("Whether to stream response events as server-sent events.")),
  "stream_options": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.lazy(() => streamOptionsParamSchema).and(import_zod42.z.any()), import_zod42.z.null()])),
  "background": import_zod42.z.optional(import_zod42.z.boolean().describe("Whether to run the request in the background and return immediately.")),
  "max_output_tokens": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.number().int(), import_zod42.z.null()])),
  "max_tool_calls": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.number().int(), import_zod42.z.null()])),
  "reasoning": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.lazy(() => reasoningParamSchema).and(import_zod42.z.any()), import_zod42.z.null()])),
  "safety_identifier": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.string(), import_zod42.z.null()])),
  "prompt_cache_key": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.string(), import_zod42.z.null()])),
  "truncation": import_zod42.z.optional(import_zod42.z.lazy(() => truncationEnumSchema).and(import_zod42.z.any())),
  "instructions": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.string(), import_zod42.z.null()])),
  "store": import_zod42.z.optional(import_zod42.z.boolean().describe("Whether to store the response so it can be retrieved later.")),
  "service_tier": import_zod42.z.optional(import_zod42.z.lazy(() => serviceTierEnumSchema).and(import_zod42.z.any())),
  "top_logprobs": import_zod42.z.optional(import_zod42.z.union([import_zod42.z.number().int(), import_zod42.z.null()]))
});

// src/gen/zod/errorSchema.ts
var import_zod43 = require("zod");
var errorSchema = import_zod43.z.object({
  "code": import_zod43.z.string().describe("A machine-readable error code that was returned."),
  "message": import_zod43.z.string().describe("A human-readable description of the error that was returned.")
}).describe("An error that occurred while generating the response.");

// src/gen/zod/incompleteDetailsSchema.ts
var import_zod44 = require("zod");
var incompleteDetailsSchema = import_zod44.z.object({
  "reason": import_zod44.z.string().describe("The reason the response could not be completed.")
}).describe("Details about why the response was incomplete.");

// src/gen/zod/functionCallOutputStatusEnumSchema.ts
var import_zod45 = require("zod");
var functionCallOutputStatusEnumSchema = import_zod45.z.enum(["in_progress", "completed", "incomplete"]).describe("Similar to `FunctionCallStatus`. All three options are allowed here for compatibility, but because in practice these items will be provided by developers, only `completed` should be used.");

// src/gen/zod/inputFileContentSchema.ts
var import_zod46 = require("zod");
var inputFileContentSchema = import_zod46.z.object({
  "type": import_zod46.z.enum(["input_file"]).default("input_file").describe("The type of the input item. Always `input_file`."),
  "filename": import_zod46.z.optional(import_zod46.z.string().describe("The name of the file to be sent to the model.")),
  "file_url": import_zod46.z.optional(import_zod46.z.string().describe("The URL of the file to be sent to the model."))
}).describe("A file input to the model.");

// src/gen/zod/inputImageContentSchema.ts
var import_zod47 = require("zod");
var inputImageContentSchema = import_zod47.z.object({
  "type": import_zod47.z.enum(["input_image"]).default("input_image").describe("The type of the input item. Always `input_image`."),
  "image_url": import_zod47.z.union([import_zod47.z.string(), import_zod47.z.null()]),
  "detail": import_zod47.z.lazy(() => imageDetailSchema).and(import_zod47.z.any())
}).describe("An image input to the model. Learn about [image inputs](/docs/guides/vision).");

// src/gen/zod/inputTextContentSchema.ts
var import_zod48 = require("zod");
var inputTextContentSchema = import_zod48.z.object({
  "type": import_zod48.z.enum(["input_text"]).default("input_text").describe("The type of the input item. Always `input_text`."),
  "text": import_zod48.z.string().describe("The text input to the model.")
}).describe("A text input to the model.");

// src/gen/zod/functionCallOutputSchema.ts
var import_zod49 = require("zod");
var functionCallOutputSchema = import_zod49.z.object({
  "type": import_zod49.z.enum(["function_call_output"]).default("function_call_output").describe("The type of the function tool call output. Always `function_call_output`."),
  "id": import_zod49.z.string().describe("The unique ID of the function tool call output. Populated when this item is returned via API."),
  "call_id": import_zod49.z.string().describe("The unique ID of the function tool call generated by the model."),
  "output": import_zod49.z.union([import_zod49.z.array(import_zod49.z.union([import_zod49.z.lazy(() => inputTextContentSchema).and(import_zod49.z.object({
    "type": import_zod49.z.literal("input_text")
  })), import_zod49.z.lazy(() => inputImageContentSchema).and(import_zod49.z.object({
    "type": import_zod49.z.literal("input_image")
  })), import_zod49.z.lazy(() => inputFileContentSchema).and(import_zod49.z.object({
    "type": import_zod49.z.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")), import_zod49.z.string()]),
  "status": import_zod49.z.lazy(() => functionCallOutputStatusEnumSchema).and(import_zod49.z.any())
}).describe("A function tool call output that was returned by the tool.");

// src/gen/zod/functionCallSchema.ts
var import_zod50 = require("zod");
var functionCallSchema = import_zod50.z.object({
  "type": import_zod50.z.enum(["function_call"]).default("function_call").describe("The type of the item. Always `function_call`."),
  "id": import_zod50.z.string().describe("The unique ID of the function call item."),
  "call_id": import_zod50.z.string().describe("The unique ID of the function tool call that was generated."),
  "name": import_zod50.z.string().describe("The name of the function that was called."),
  "arguments": import_zod50.z.string().describe("The arguments JSON string that was generated."),
  "status": import_zod50.z.lazy(() => functionCallStatusSchema).and(import_zod50.z.any())
}).describe("A function tool call that was generated by the model.");

// src/gen/zod/messageRoleSchema.ts
var import_zod51 = require("zod");
var messageRoleSchema = import_zod51.z.enum(["user", "assistant", "system", "developer"]);

// src/gen/zod/messageStatusSchema.ts
var import_zod52 = require("zod");
var messageStatusSchema = import_zod52.z.enum(["in_progress", "completed", "incomplete"]);

// src/gen/zod/topLogProbSchema.ts
var import_zod53 = require("zod");
var topLogProbSchema = import_zod53.z.object({
  "token": import_zod53.z.string(),
  "logprob": import_zod53.z.number(),
  "bytes": import_zod53.z.array(import_zod53.z.number().int())
}).describe("The top log probability of a token.");

// src/gen/zod/logProbSchema.ts
var import_zod54 = require("zod");
var logProbSchema = import_zod54.z.object({
  "token": import_zod54.z.string(),
  "logprob": import_zod54.z.number(),
  "bytes": import_zod54.z.array(import_zod54.z.number().int()),
  "top_logprobs": import_zod54.z.array(import_zod54.z.lazy(() => topLogProbSchema).describe("The top log probability of a token."))
}).describe("The log probability of a token.");

// src/gen/zod/outputTextContentSchema.ts
var import_zod55 = require("zod");
var outputTextContentSchema = import_zod55.z.object({
  "type": import_zod55.z.enum(["output_text"]).default("output_text").describe("The type of the output text. Always `output_text`."),
  "text": import_zod55.z.string().describe("The text output from the model."),
  "annotations": import_zod55.z.array(import_zod55.z.lazy(() => annotationSchema).describe("An annotation that applies to a span of output text.")).describe("The annotations of the text output."),
  "logprobs": import_zod55.z.array(import_zod55.z.lazy(() => logProbSchema).describe("The log probability of a token."))
}).describe("A text output from the model.");

// src/gen/zod/reasoningTextContentSchema.ts
var import_zod56 = require("zod");
var reasoningTextContentSchema = import_zod56.z.object({
  "type": import_zod56.z.enum(["reasoning_text"]).default("reasoning_text").describe("The type of the reasoning text. Always `reasoning_text`."),
  "text": import_zod56.z.string().describe("The reasoning text from the model.")
}).describe("Reasoning text from the model.");

// src/gen/zod/refusalContentSchema.ts
var import_zod57 = require("zod");
var refusalContentSchema = import_zod57.z.object({
  "type": import_zod57.z.enum(["refusal"]).default("refusal").describe("The type of the refusal. Always `refusal`."),
  "refusal": import_zod57.z.string().describe("The refusal explanation from the model.")
}).describe("A refusal from the model.");

// src/gen/zod/summaryTextContentSchema.ts
var import_zod58 = require("zod");
var summaryTextContentSchema = import_zod58.z.object({
  "type": import_zod58.z.enum(["summary_text"]).default("summary_text").describe("The type of the object. Always `summary_text`."),
  "text": import_zod58.z.string().describe("A summary of the reasoning output from the model so far.")
}).describe("A summary text from the model.");

// src/gen/zod/textContentSchema.ts
var import_zod59 = require("zod");
var textContentSchema = import_zod59.z.object({
  "type": import_zod59.z.enum(["text"]).default("text"),
  "text": import_zod59.z.string()
}).describe("A text content.");

// src/gen/zod/messageSchema.ts
var import_zod60 = require("zod");
var messageSchema = import_zod60.z.object({
  "type": import_zod60.z.enum(["message"]).default("message").describe("The type of the message. Always set to `message`."),
  "id": import_zod60.z.string().describe("The unique ID of the message."),
  "status": import_zod60.z.lazy(() => messageStatusSchema).and(import_zod60.z.any()),
  "role": import_zod60.z.lazy(() => messageRoleSchema).and(import_zod60.z.any()),
  "content": import_zod60.z.array(import_zod60.z.union([import_zod60.z.lazy(() => inputTextContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("input_text")
  })), import_zod60.z.lazy(() => outputTextContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("output_text")
  })), import_zod60.z.lazy(() => textContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("text")
  })), import_zod60.z.lazy(() => summaryTextContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("summary_text")
  })), import_zod60.z.lazy(() => reasoningTextContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("reasoning_text")
  })), import_zod60.z.lazy(() => refusalContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("refusal")
  })), import_zod60.z.lazy(() => inputImageContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("input_image")
  })), import_zod60.z.lazy(() => inputFileContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("input_file")
  })), import_zod60.z.lazy(() => inputVideoContentSchema).and(import_zod60.z.object({
    "type": import_zod60.z.literal("input_video")
  }))]).describe("A content part that makes up an input or output item.")).describe("The content of the message")
}).describe("A message to or from the model.");

// src/gen/zod/reasoningBodySchema.ts
var import_zod61 = require("zod");
var reasoningBodySchema = import_zod61.z.object({
  "type": import_zod61.z.enum(["reasoning"]).default("reasoning").describe("The type of the item. Always `reasoning`."),
  "id": import_zod61.z.string().describe("The unique ID of the reasoning item."),
  "content": import_zod61.z.optional(import_zod61.z.array(import_zod61.z.union([import_zod61.z.lazy(() => inputTextContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("input_text")
  })), import_zod61.z.lazy(() => outputTextContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("output_text")
  })), import_zod61.z.lazy(() => textContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("text")
  })), import_zod61.z.lazy(() => summaryTextContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("summary_text")
  })), import_zod61.z.lazy(() => reasoningTextContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("reasoning_text")
  })), import_zod61.z.lazy(() => refusalContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("refusal")
  })), import_zod61.z.lazy(() => inputImageContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("input_image")
  })), import_zod61.z.lazy(() => inputFileContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")).describe("The reasoning content that was generated.")),
  "summary": import_zod61.z.array(import_zod61.z.union([import_zod61.z.lazy(() => inputTextContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("input_text")
  })), import_zod61.z.lazy(() => outputTextContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("output_text")
  })), import_zod61.z.lazy(() => textContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("text")
  })), import_zod61.z.lazy(() => summaryTextContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("summary_text")
  })), import_zod61.z.lazy(() => reasoningTextContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("reasoning_text")
  })), import_zod61.z.lazy(() => refusalContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("refusal")
  })), import_zod61.z.lazy(() => inputImageContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("input_image")
  })), import_zod61.z.lazy(() => inputFileContentSchema).and(import_zod61.z.object({
    "type": import_zod61.z.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")).describe("The reasoning summary content that was generated."),
  "encrypted_content": import_zod61.z.optional(import_zod61.z.string().describe("The encrypted reasoning content that was generated."))
}).describe("A reasoning item that was generated by the model.");

// src/gen/zod/itemFieldSchema.ts
var import_zod62 = require("zod");
var itemFieldSchema = import_zod62.z.union([import_zod62.z.lazy(() => messageSchema).and(import_zod62.z.object({
  "type": import_zod62.z.literal("message")
})), import_zod62.z.lazy(() => functionCallSchema).and(import_zod62.z.object({
  "type": import_zod62.z.literal("function_call")
})), import_zod62.z.lazy(() => functionCallOutputSchema).and(import_zod62.z.object({
  "type": import_zod62.z.literal("function_call_output")
})), import_zod62.z.lazy(() => reasoningBodySchema).and(import_zod62.z.object({
  "type": import_zod62.z.literal("reasoning")
}))]).describe("An item representing a message, tool call, tool output, reasoning, or other response element.");

// src/gen/zod/reasoningSchema.ts
var import_zod63 = require("zod");
var reasoningSchema = import_zod63.z.object({
  "effort": import_zod63.z.union([import_zod63.z.lazy(() => reasoningEffortEnumSchema), import_zod63.z.null()]),
  "summary": import_zod63.z.union([import_zod63.z.lazy(() => reasoningSummaryEnumSchema).and(import_zod63.z.any()), import_zod63.z.null()])
}).describe("Reasoning configuration and metadata that were used for the response.");

// src/gen/zod/jsonObjectResponseFormatSchema.ts
var import_zod64 = require("zod");
var jsonObjectResponseFormatSchema = import_zod64.z.object({
  "type": import_zod64.z.enum(["json_object"]).default("json_object")
});

// src/gen/zod/jsonSchemaResponseFormatSchema.ts
var import_zod65 = require("zod");
var jsonSchemaResponseFormatSchema = import_zod65.z.object({
  "type": import_zod65.z.enum(["json_schema"]).default("json_schema"),
  "name": import_zod65.z.string(),
  "description": import_zod65.z.union([import_zod65.z.string(), import_zod65.z.null()]),
  "schema": import_zod65.z.null(),
  "strict": import_zod65.z.boolean()
});

// src/gen/zod/textFieldSchema.ts
var import_zod66 = require("zod");
var textFieldSchema = import_zod66.z.object({
  "format": import_zod66.z.union([import_zod66.z.lazy(() => textResponseFormatSchema), import_zod66.z.lazy(() => jsonObjectResponseFormatSchema), import_zod66.z.lazy(() => jsonSchemaResponseFormatSchema)]),
  "verbosity": import_zod66.z.optional(import_zod66.z.lazy(() => verbosityEnumSchema))
});

// src/gen/zod/functionToolSchema.ts
var import_zod67 = require("zod");
var functionToolSchema = import_zod67.z.object({
  "type": import_zod67.z.enum(["function"]).default("function").describe("The type of the function tool. Always `function`."),
  "name": import_zod67.z.string().describe("The name of the function to call."),
  "description": import_zod67.z.union([import_zod67.z.string(), import_zod67.z.null()]),
  "parameters": import_zod67.z.union([import_zod67.z.object({}).catchall(import_zod67.z.any()), import_zod67.z.null()]),
  "strict": import_zod67.z.union([import_zod67.z.boolean(), import_zod67.z.null()])
}).describe("Defines a function in your own code the model can choose to call. Learn more about [function calling](https://platform.openai.com/docs/guides/function-calling).");

// src/gen/zod/toolSchema.ts
var import_zod68 = require("zod");
var toolSchema = import_zod68.z.lazy(() => functionToolSchema).and(import_zod68.z.object({
  "type": import_zod68.z.literal("function")
})).describe("A tool that can be used to generate a response.");

// src/gen/zod/inputTokensDetailsSchema.ts
var import_zod69 = require("zod");
var inputTokensDetailsSchema = import_zod69.z.object({
  "cached_tokens": import_zod69.z.number().int().describe("The number of input tokens that were served from cache.")
}).describe("A breakdown of input token usage that was recorded.");

// src/gen/zod/outputTokensDetailsSchema.ts
var import_zod70 = require("zod");
var outputTokensDetailsSchema = import_zod70.z.object({
  "reasoning_tokens": import_zod70.z.number().int().describe("The number of output tokens that were attributed to reasoning.")
}).describe("A breakdown of output token usage that was recorded.");

// src/gen/zod/usageSchema.ts
var import_zod71 = require("zod");
var usageSchema = import_zod71.z.object({
  "input_tokens": import_zod71.z.number().int().describe("The number of input tokens that were used to generate the response."),
  "output_tokens": import_zod71.z.number().int().describe("The number of output tokens that were generated by the model."),
  "total_tokens": import_zod71.z.number().int().describe("The total number of tokens that were used."),
  "input_tokens_details": import_zod71.z.lazy(() => inputTokensDetailsSchema).and(import_zod71.z.any()),
  "output_tokens_details": import_zod71.z.lazy(() => outputTokensDetailsSchema).and(import_zod71.z.any())
}).describe("Token usage statistics that were recorded for the response.");

// src/gen/zod/responseResourceSchema.ts
var import_zod72 = require("zod");
var responseResourceSchema = import_zod72.z.object({
  "id": import_zod72.z.string().describe("The unique ID of the response that was created."),
  "object": import_zod72.z.enum(["response"]).default("response").describe("The object type, which was always `response`."),
  "created_at": import_zod72.z.number().int().describe("The Unix timestamp (in seconds) for when the response was created."),
  "completed_at": import_zod72.z.union([import_zod72.z.number().int(), import_zod72.z.null()]),
  "status": import_zod72.z.string().describe("The status that was set for the response."),
  "incomplete_details": import_zod72.z.union([import_zod72.z.lazy(() => incompleteDetailsSchema).and(import_zod72.z.any()), import_zod72.z.null()]),
  "model": import_zod72.z.string().describe("The model that generated this response."),
  "previous_response_id": import_zod72.z.union([import_zod72.z.string(), import_zod72.z.null()]),
  "instructions": import_zod72.z.union([import_zod72.z.string(), import_zod72.z.null()]),
  "output": import_zod72.z.array(import_zod72.z.lazy(() => itemFieldSchema).describe("An item representing a message, tool call, tool output, reasoning, or other response element.")).describe("The output items that were generated by the model."),
  "error": import_zod72.z.union([import_zod72.z.lazy(() => errorSchema).and(import_zod72.z.any()), import_zod72.z.null()]),
  "tools": import_zod72.z.array(import_zod72.z.lazy(() => toolSchema).describe("A tool that can be used to generate a response.")).describe("The tools that were available to the model during response generation."),
  "tool_choice": import_zod72.z.union([import_zod72.z.lazy(() => functionToolChoiceSchema), import_zod72.z.lazy(() => toolChoiceValueEnumSchema), import_zod72.z.lazy(() => allowedToolChoiceSchema)]),
  "truncation": import_zod72.z.lazy(() => truncationEnumSchema).and(import_zod72.z.any()),
  "parallel_tool_calls": import_zod72.z.boolean().describe("Whether the model was allowed to call multiple tools in parallel."),
  "text": import_zod72.z.lazy(() => textFieldSchema).and(import_zod72.z.any()),
  "top_p": import_zod72.z.number().describe("The nucleus sampling parameter that was used for this response."),
  "presence_penalty": import_zod72.z.number().describe("The presence penalty that was used to penalize new tokens based on whether they appear in the text so far."),
  "frequency_penalty": import_zod72.z.number().describe("The frequency penalty that was used to penalize new tokens based on their frequency in the text so far."),
  "top_logprobs": import_zod72.z.number().int().describe("The number of most likely tokens that were returned at each position, along with their log probabilities."),
  "temperature": import_zod72.z.number().describe("The sampling temperature that was used for this response."),
  "reasoning": import_zod72.z.union([import_zod72.z.lazy(() => reasoningSchema).and(import_zod72.z.any()), import_zod72.z.null()]),
  "usage": import_zod72.z.union([import_zod72.z.lazy(() => usageSchema).and(import_zod72.z.any()), import_zod72.z.null()]),
  "max_output_tokens": import_zod72.z.union([import_zod72.z.number().int(), import_zod72.z.null()]),
  "max_tool_calls": import_zod72.z.union([import_zod72.z.number().int(), import_zod72.z.null()]),
  "store": import_zod72.z.boolean().describe("Whether this response was stored so it can be retrieved later."),
  "background": import_zod72.z.boolean().describe("Whether this request was run in the background."),
  "service_tier": import_zod72.z.string().describe("The service tier that was used for this response."),
  "metadata": import_zod72.z.any().describe("Developer-defined metadata that was associated with the response."),
  "safety_identifier": import_zod72.z.union([import_zod72.z.string(), import_zod72.z.null()]),
  "prompt_cache_key": import_zod72.z.union([import_zod72.z.string(), import_zod72.z.null()])
}).describe("The complete response object that was returned by the Responses API.");

// src/gen/zod/createresponseSchema.ts
var import_zod73 = require("zod");
var createresponse200Schema = import_zod73.z.lazy(() => responseResourceSchema).describe("The complete response object that was returned by the Responses API.");
var createresponseMutationRequestSchema = import_zod73.z.lazy(() => createResponseBodySchema);
var createresponseMutationResponseSchema = import_zod73.z.lazy(() => createresponse200Schema);

// src/gen/zod/detailEnumSchema.ts
var import_zod74 = require("zod");
var detailEnumSchema = import_zod74.z.enum(["low", "high", "auto"]);

// src/gen/zod/developerMessageItemParamSchema.ts
var import_zod75 = require("zod");
var developerMessageItemParamSchema = import_zod75.z.object({
  "id": import_zod75.z.optional(import_zod75.z.union([import_zod75.z.string(), import_zod75.z.null()])),
  "type": import_zod75.z.enum(["message"]).default("message").describe("The item type. Always `message`."),
  "role": import_zod75.z.enum(["developer"]).default("developer").describe("The message role. Always `developer`."),
  "content": import_zod75.z.union([import_zod75.z.array(import_zod75.z.lazy(() => inputTextContentParamSchema).and(import_zod75.z.object({
    "type": import_zod75.z.literal("input_text")
  }))), import_zod75.z.string()]).describe("The message content, as an array of content parts."),
  "status": import_zod75.z.optional(import_zod75.z.union([import_zod75.z.string(), import_zod75.z.null()]))
});

// src/gen/zod/errorPayloadSchema.ts
var import_zod76 = require("zod");
var errorPayloadSchema = import_zod76.z.object({
  "type": import_zod76.z.string().describe("The error type that was emitted."),
  "code": import_zod76.z.union([import_zod76.z.string(), import_zod76.z.null()]),
  "message": import_zod76.z.string().describe("The human-readable error message that was emitted."),
  "param": import_zod76.z.union([import_zod76.z.string(), import_zod76.z.null()]),
  "headers": import_zod76.z.optional(import_zod76.z.object({}).catchall(import_zod76.z.string().describe("The header value that was emitted.")).describe("The response headers that were emitted with the error, if any."))
}).describe("An error payload that was emitted for a streaming error event.");

// src/gen/zod/errorStreamingEventSchema.ts
var import_zod77 = require("zod");
var errorStreamingEventSchema = import_zod77.z.object({
  "type": import_zod77.z.enum(["error"]).default("error").describe("The type of the event, always `error`."),
  "sequence_number": import_zod77.z.number().int().describe("The sequence number of the event that was emitted."),
  "error": import_zod77.z.lazy(() => errorPayloadSchema).and(import_zod77.z.any())
}).describe("A streaming event that indicated an error was emitted.");

// src/gen/zod/functionCallItemStatusSchema.ts
var import_zod78 = require("zod");
var functionCallItemStatusSchema = import_zod78.z.enum(["in_progress", "completed", "incomplete"]);

// src/gen/zod/responseCompletedStreamingEventSchema.ts
var import_zod79 = require("zod");
var responseCompletedStreamingEventSchema = import_zod79.z.object({
  "type": import_zod79.z.enum(["response.completed"]).default("response.completed").describe("The type of the event, always `response.completed`."),
  "sequence_number": import_zod79.z.number().int().describe("The sequence number of the event that was emitted."),
  "response": import_zod79.z.lazy(() => responseResourceSchema).and(import_zod79.z.any())
}).describe("A streaming event that indicated the response was completed.");

// src/gen/zod/responseContentPartAddedStreamingEventSchema.ts
var import_zod80 = require("zod");
var responseContentPartAddedStreamingEventSchema = import_zod80.z.object({
  "type": import_zod80.z.enum(["response.content_part.added"]).default("response.content_part.added").describe("The type of the event, always `response.content_part.added`."),
  "sequence_number": import_zod80.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod80.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod80.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod80.z.number().int().describe("The index of the content part that was added."),
  "part": import_zod80.z.union([import_zod80.z.lazy(() => inputTextContentSchema).and(import_zod80.z.object({
    "type": import_zod80.z.literal("input_text")
  })), import_zod80.z.lazy(() => outputTextContentSchema).and(import_zod80.z.object({
    "type": import_zod80.z.literal("output_text")
  })), import_zod80.z.lazy(() => textContentSchema).and(import_zod80.z.object({
    "type": import_zod80.z.literal("text")
  })), import_zod80.z.lazy(() => summaryTextContentSchema).and(import_zod80.z.object({
    "type": import_zod80.z.literal("summary_text")
  })), import_zod80.z.lazy(() => reasoningTextContentSchema).and(import_zod80.z.object({
    "type": import_zod80.z.literal("reasoning_text")
  })), import_zod80.z.lazy(() => refusalContentSchema).and(import_zod80.z.object({
    "type": import_zod80.z.literal("refusal")
  })), import_zod80.z.lazy(() => inputImageContentSchema).and(import_zod80.z.object({
    "type": import_zod80.z.literal("input_image")
  })), import_zod80.z.lazy(() => inputFileContentSchema).and(import_zod80.z.object({
    "type": import_zod80.z.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")
}).describe("A streaming event that indicated a content part was added.");

// src/gen/zod/responseContentPartDoneStreamingEventSchema.ts
var import_zod81 = require("zod");
var responseContentPartDoneStreamingEventSchema = import_zod81.z.object({
  "type": import_zod81.z.enum(["response.content_part.done"]).default("response.content_part.done").describe("The type of the event, always `response.content_part.done`."),
  "sequence_number": import_zod81.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod81.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod81.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod81.z.number().int().describe("The index of the content part that was completed."),
  "part": import_zod81.z.union([import_zod81.z.lazy(() => inputTextContentSchema).and(import_zod81.z.object({
    "type": import_zod81.z.literal("input_text")
  })), import_zod81.z.lazy(() => outputTextContentSchema).and(import_zod81.z.object({
    "type": import_zod81.z.literal("output_text")
  })), import_zod81.z.lazy(() => textContentSchema).and(import_zod81.z.object({
    "type": import_zod81.z.literal("text")
  })), import_zod81.z.lazy(() => summaryTextContentSchema).and(import_zod81.z.object({
    "type": import_zod81.z.literal("summary_text")
  })), import_zod81.z.lazy(() => reasoningTextContentSchema).and(import_zod81.z.object({
    "type": import_zod81.z.literal("reasoning_text")
  })), import_zod81.z.lazy(() => refusalContentSchema).and(import_zod81.z.object({
    "type": import_zod81.z.literal("refusal")
  })), import_zod81.z.lazy(() => inputImageContentSchema).and(import_zod81.z.object({
    "type": import_zod81.z.literal("input_image")
  })), import_zod81.z.lazy(() => inputFileContentSchema).and(import_zod81.z.object({
    "type": import_zod81.z.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")
}).describe("A streaming event that indicated a content part was completed.");

// src/gen/zod/responseCreatedStreamingEventSchema.ts
var import_zod82 = require("zod");
var responseCreatedStreamingEventSchema = import_zod82.z.object({
  "type": import_zod82.z.enum(["response.created"]).default("response.created").describe("The type of the event, always `response.created`."),
  "sequence_number": import_zod82.z.number().int().describe("The sequence number of the event that was emitted."),
  "response": import_zod82.z.lazy(() => responseResourceSchema).and(import_zod82.z.any())
}).describe("A streaming event that indicated the response was created.");

// src/gen/zod/responseFailedStreamingEventSchema.ts
var import_zod83 = require("zod");
var responseFailedStreamingEventSchema = import_zod83.z.object({
  "type": import_zod83.z.enum(["response.failed"]).default("response.failed").describe("The type of the event, always `response.failed`."),
  "sequence_number": import_zod83.z.number().int().describe("The sequence number of the event that was emitted."),
  "response": import_zod83.z.lazy(() => responseResourceSchema).and(import_zod83.z.any())
}).describe("A streaming event that indicated the response had failed.");

// src/gen/zod/responseFunctionCallArgumentsDeltaStreamingEventSchema.ts
var import_zod84 = require("zod");
var responseFunctionCallArgumentsDeltaStreamingEventSchema = import_zod84.z.object({
  "type": import_zod84.z.enum(["response.function_call_arguments.delta"]).default("response.function_call_arguments.delta").describe("The type of the event, always `response.function_call_arguments.delta`."),
  "sequence_number": import_zod84.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod84.z.string().describe("The ID of the tool call item that was updated."),
  "output_index": import_zod84.z.number().int().describe("The index of the output item that was updated."),
  "delta": import_zod84.z.string().describe("The arguments delta that was appended."),
  "obfuscation": import_zod84.z.optional(import_zod84.z.string().describe("An obfuscation string that was added to pad the event payload."))
}).describe("A streaming event that indicated function call arguments were incrementally added.");

// src/gen/zod/responseFunctionCallArgumentsDoneStreamingEventSchema.ts
var import_zod85 = require("zod");
var responseFunctionCallArgumentsDoneStreamingEventSchema = import_zod85.z.object({
  "type": import_zod85.z.enum(["response.function_call_arguments.done"]).default("response.function_call_arguments.done").describe("The type of the event, always `response.function_call_arguments.done`."),
  "sequence_number": import_zod85.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod85.z.string().describe("The ID of the tool call item that was updated."),
  "output_index": import_zod85.z.number().int().describe("The index of the output item that was updated."),
  "arguments": import_zod85.z.string().describe("The final arguments string that was emitted.")
}).describe("A streaming event that indicated function call arguments were completed.");

// src/gen/zod/responseIncompleteStreamingEventSchema.ts
var import_zod86 = require("zod");
var responseIncompleteStreamingEventSchema = import_zod86.z.object({
  "type": import_zod86.z.enum(["response.incomplete"]).default("response.incomplete").describe("The type of the event, always `response.incomplete`."),
  "sequence_number": import_zod86.z.number().int().describe("The sequence number of the event that was emitted."),
  "response": import_zod86.z.lazy(() => responseResourceSchema).and(import_zod86.z.any())
}).describe("A streaming event that indicated the response was incomplete.");

// src/gen/zod/responseInProgressStreamingEventSchema.ts
var import_zod87 = require("zod");
var responseInProgressStreamingEventSchema = import_zod87.z.object({
  "type": import_zod87.z.enum(["response.in_progress"]).default("response.in_progress").describe("The type of the event, always `response.in_progress`."),
  "sequence_number": import_zod87.z.number().int().describe("The sequence number of the event that was emitted."),
  "response": import_zod87.z.lazy(() => responseResourceSchema).and(import_zod87.z.any())
}).describe("A streaming event that indicated the response was in progress.");

// src/gen/zod/responseOutputItemAddedStreamingEventSchema.ts
var import_zod88 = require("zod");
var responseOutputItemAddedStreamingEventSchema = import_zod88.z.object({
  "type": import_zod88.z.enum(["response.output_item.added"]).default("response.output_item.added").describe("The type of the event, always `response.output_item.added`."),
  "sequence_number": import_zod88.z.number().int().describe("The sequence number of the event that was emitted."),
  "output_index": import_zod88.z.number().int().describe("The index of the output item that was added."),
  "item": import_zod88.z.union([import_zod88.z.lazy(() => itemFieldSchema).and(import_zod88.z.any()), import_zod88.z.null()])
}).describe("A streaming event that indicated an output item was added to the response.");

// src/gen/zod/responseOutputItemDoneStreamingEventSchema.ts
var import_zod89 = require("zod");
var responseOutputItemDoneStreamingEventSchema = import_zod89.z.object({
  "type": import_zod89.z.enum(["response.output_item.done"]).default("response.output_item.done").describe("The type of the event, always `response.output_item.done`."),
  "sequence_number": import_zod89.z.number().int().describe("The sequence number of the event that was emitted."),
  "output_index": import_zod89.z.number().int().describe("The index of the output item that was completed."),
  "item": import_zod89.z.union([import_zod89.z.lazy(() => itemFieldSchema).and(import_zod89.z.any()), import_zod89.z.null()])
}).describe("A streaming event that indicated an output item was completed.");

// src/gen/zod/responseOutputTextAnnotationAddedStreamingEventSchema.ts
var import_zod90 = require("zod");
var responseOutputTextAnnotationAddedStreamingEventSchema = import_zod90.z.object({
  "type": import_zod90.z.enum(["response.output_text.annotation.added"]).default("response.output_text.annotation.added").describe("The type of the event, always `response.output_text.annotation.added`."),
  "sequence_number": import_zod90.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod90.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod90.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod90.z.number().int().describe("The index of the output text content that was updated."),
  "annotation_index": import_zod90.z.number().int().describe("The index of the annotation that was added."),
  "annotation": import_zod90.z.union([import_zod90.z.lazy(() => annotationSchema).and(import_zod90.z.any()), import_zod90.z.null()])
}).describe("A streaming event that indicated an output text annotation was added.");

// src/gen/zod/responseOutputTextDeltaStreamingEventSchema.ts
var import_zod91 = require("zod");
var responseOutputTextDeltaStreamingEventSchema = import_zod91.z.object({
  "type": import_zod91.z.enum(["response.output_text.delta"]).default("response.output_text.delta").describe("The type of the event, always `response.output_text.delta`."),
  "sequence_number": import_zod91.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod91.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod91.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod91.z.number().int().describe("The index of the content part that was updated."),
  "delta": import_zod91.z.string().describe("The text delta that was appended."),
  "logprobs": import_zod91.z.array(import_zod91.z.lazy(() => logProbSchema).describe("The log probability of a token.")).describe("The token log probabilities that were emitted with the delta, if any."),
  "obfuscation": import_zod91.z.optional(import_zod91.z.string().describe("An obfuscation string that was added to pad the event payload."))
}).describe("A streaming event that indicated output text was incrementally added.");

// src/gen/zod/responseOutputTextDoneStreamingEventSchema.ts
var import_zod92 = require("zod");
var responseOutputTextDoneStreamingEventSchema = import_zod92.z.object({
  "type": import_zod92.z.enum(["response.output_text.done"]).default("response.output_text.done").describe("The type of the event, always `response.output_text.done`."),
  "sequence_number": import_zod92.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod92.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod92.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod92.z.number().int().describe("The index of the content part that was completed."),
  "text": import_zod92.z.string().describe("The final text that was emitted."),
  "logprobs": import_zod92.z.array(import_zod92.z.lazy(() => logProbSchema).describe("The log probability of a token.")).describe("The token log probabilities that were emitted with the final text, if any.")
}).describe("A streaming event that indicated output text was completed.");

// src/gen/zod/responseQueuedStreamingEventSchema.ts
var import_zod93 = require("zod");
var responseQueuedStreamingEventSchema = import_zod93.z.object({
  "type": import_zod93.z.enum(["response.queued"]).default("response.queued").describe("The type of the event, always `response.queued`."),
  "sequence_number": import_zod93.z.number().int().describe("The sequence number of the event that was emitted."),
  "response": import_zod93.z.lazy(() => responseResourceSchema).and(import_zod93.z.any())
}).describe("A streaming event that indicated the response was queued.");

// src/gen/zod/responseReasoningDeltaStreamingEventSchema.ts
var import_zod94 = require("zod");
var responseReasoningDeltaStreamingEventSchema = import_zod94.z.object({
  "type": import_zod94.z.enum(["response.reasoning.delta"]).default("response.reasoning.delta").describe("The type of the event, always `response.reasoning.delta`."),
  "sequence_number": import_zod94.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod94.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod94.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod94.z.number().int().describe("The index of the reasoning content that was updated."),
  "delta": import_zod94.z.string().describe("The reasoning text delta that was appended."),
  "obfuscation": import_zod94.z.optional(import_zod94.z.string().describe("An obfuscation string that was added to pad the event payload."))
}).describe("A streaming event that indicated reasoning text was incrementally added.");

// src/gen/zod/responseReasoningDoneStreamingEventSchema.ts
var import_zod95 = require("zod");
var responseReasoningDoneStreamingEventSchema = import_zod95.z.object({
  "type": import_zod95.z.enum(["response.reasoning.done"]).default("response.reasoning.done").describe("The type of the event, always `response.reasoning.done`."),
  "sequence_number": import_zod95.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod95.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod95.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod95.z.number().int().describe("The index of the reasoning content that was completed."),
  "text": import_zod95.z.string().describe("The final reasoning text that was emitted.")
}).describe("A streaming event that indicated reasoning text was completed.");

// src/gen/zod/responseReasoningSummaryDeltaStreamingEventSchema.ts
var import_zod96 = require("zod");
var responseReasoningSummaryDeltaStreamingEventSchema = import_zod96.z.object({
  "type": import_zod96.z.enum(["response.reasoning_summary_text.delta"]).default("response.reasoning_summary_text.delta").describe("The type of the event, always `response.reasoning_summary.delta`."),
  "sequence_number": import_zod96.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod96.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod96.z.number().int().describe("The index of the output item that was updated."),
  "summary_index": import_zod96.z.number().int().describe("The index of the summary content that was updated."),
  "delta": import_zod96.z.string().describe("The summary text delta that was appended."),
  "obfuscation": import_zod96.z.optional(import_zod96.z.string().describe("An obfuscation string that was added to pad the event payload."))
}).describe("A streaming event that indicated a reasoning summary was incrementally added.");

// src/gen/zod/responseReasoningSummaryDoneStreamingEventSchema.ts
var import_zod97 = require("zod");
var responseReasoningSummaryDoneStreamingEventSchema = import_zod97.z.object({
  "type": import_zod97.z.enum(["response.reasoning_summary_text.done"]).default("response.reasoning_summary_text.done").describe("The type of the event, always `response.reasoning_summary.done`."),
  "sequence_number": import_zod97.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod97.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod97.z.number().int().describe("The index of the output item that was updated."),
  "summary_index": import_zod97.z.number().int().describe("The index of the summary content that was completed."),
  "text": import_zod97.z.string().describe("The final summary text that was emitted.")
}).describe("A streaming event that indicated a reasoning summary was completed.");

// src/gen/zod/responseReasoningSummaryPartAddedStreamingEventSchema.ts
var import_zod98 = require("zod");
var responseReasoningSummaryPartAddedStreamingEventSchema = import_zod98.z.object({
  "type": import_zod98.z.enum(["response.reasoning_summary_part.added"]).default("response.reasoning_summary_part.added").describe("The type of the event, always `response.reasoning_summary_part.added`."),
  "sequence_number": import_zod98.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod98.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod98.z.number().int().describe("The index of the output item that was updated."),
  "summary_index": import_zod98.z.number().int().describe("The index of the summary part that was added."),
  "part": import_zod98.z.union([import_zod98.z.lazy(() => inputTextContentSchema).and(import_zod98.z.object({
    "type": import_zod98.z.literal("input_text")
  })), import_zod98.z.lazy(() => outputTextContentSchema).and(import_zod98.z.object({
    "type": import_zod98.z.literal("output_text")
  })), import_zod98.z.lazy(() => textContentSchema).and(import_zod98.z.object({
    "type": import_zod98.z.literal("text")
  })), import_zod98.z.lazy(() => summaryTextContentSchema).and(import_zod98.z.object({
    "type": import_zod98.z.literal("summary_text")
  })), import_zod98.z.lazy(() => reasoningTextContentSchema).and(import_zod98.z.object({
    "type": import_zod98.z.literal("reasoning_text")
  })), import_zod98.z.lazy(() => refusalContentSchema).and(import_zod98.z.object({
    "type": import_zod98.z.literal("refusal")
  })), import_zod98.z.lazy(() => inputImageContentSchema).and(import_zod98.z.object({
    "type": import_zod98.z.literal("input_image")
  })), import_zod98.z.lazy(() => inputFileContentSchema).and(import_zod98.z.object({
    "type": import_zod98.z.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")
}).describe("A streaming event that indicated a reasoning summary part was added.");

// src/gen/zod/responseReasoningSummaryPartDoneStreamingEventSchema.ts
var import_zod99 = require("zod");
var responseReasoningSummaryPartDoneStreamingEventSchema = import_zod99.z.object({
  "type": import_zod99.z.enum(["response.reasoning_summary_part.done"]).default("response.reasoning_summary_part.done").describe("The type of the event, always `response.reasoning_summary_part.done`."),
  "sequence_number": import_zod99.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod99.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod99.z.number().int().describe("The index of the output item that was updated."),
  "summary_index": import_zod99.z.number().int().describe("The index of the summary part that was completed."),
  "part": import_zod99.z.union([import_zod99.z.lazy(() => inputTextContentSchema).and(import_zod99.z.object({
    "type": import_zod99.z.literal("input_text")
  })), import_zod99.z.lazy(() => outputTextContentSchema).and(import_zod99.z.object({
    "type": import_zod99.z.literal("output_text")
  })), import_zod99.z.lazy(() => textContentSchema).and(import_zod99.z.object({
    "type": import_zod99.z.literal("text")
  })), import_zod99.z.lazy(() => summaryTextContentSchema).and(import_zod99.z.object({
    "type": import_zod99.z.literal("summary_text")
  })), import_zod99.z.lazy(() => reasoningTextContentSchema).and(import_zod99.z.object({
    "type": import_zod99.z.literal("reasoning_text")
  })), import_zod99.z.lazy(() => refusalContentSchema).and(import_zod99.z.object({
    "type": import_zod99.z.literal("refusal")
  })), import_zod99.z.lazy(() => inputImageContentSchema).and(import_zod99.z.object({
    "type": import_zod99.z.literal("input_image")
  })), import_zod99.z.lazy(() => inputFileContentSchema).and(import_zod99.z.object({
    "type": import_zod99.z.literal("input_file")
  }))]).describe("A content part that makes up an input or output item.")
}).describe("A streaming event that indicated a reasoning summary part was completed.");

// src/gen/zod/responseRefusalDeltaStreamingEventSchema.ts
var import_zod100 = require("zod");
var responseRefusalDeltaStreamingEventSchema = import_zod100.z.object({
  "type": import_zod100.z.enum(["response.refusal.delta"]).default("response.refusal.delta").describe("The type of the event, always `response.refusal.delta`."),
  "sequence_number": import_zod100.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod100.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod100.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod100.z.number().int().describe("The index of the refusal content that was updated."),
  "delta": import_zod100.z.string().describe("The refusal text delta that was appended.")
}).describe("A streaming event that indicated refusal text was incrementally added.");

// src/gen/zod/responseRefusalDoneStreamingEventSchema.ts
var import_zod101 = require("zod");
var responseRefusalDoneStreamingEventSchema = import_zod101.z.object({
  "type": import_zod101.z.enum(["response.refusal.done"]).default("response.refusal.done").describe("The type of the event, always `response.refusal.done`."),
  "sequence_number": import_zod101.z.number().int().describe("The sequence number of the event that was emitted."),
  "item_id": import_zod101.z.string().describe("The ID of the item that was updated."),
  "output_index": import_zod101.z.number().int().describe("The index of the output item that was updated."),
  "content_index": import_zod101.z.number().int().describe("The index of the refusal content that was completed."),
  "refusal": import_zod101.z.string().describe("The final refusal text that was emitted.")
}).describe("A streaming event that indicated refusal text was completed.");

// src/gen/zod/systemMessageItemParamSchema.ts
var import_zod102 = require("zod");
var systemMessageItemParamSchema = import_zod102.z.object({
  "id": import_zod102.z.optional(import_zod102.z.union([import_zod102.z.string(), import_zod102.z.null()])),
  "type": import_zod102.z.enum(["message"]).default("message").describe("The item type. Always `message`."),
  "role": import_zod102.z.enum(["system"]).default("system").describe("The message role. Always `system`."),
  "content": import_zod102.z.union([import_zod102.z.array(import_zod102.z.lazy(() => inputTextContentParamSchema).and(import_zod102.z.object({
    "type": import_zod102.z.literal("input_text")
  }))), import_zod102.z.string()]).describe("The message content, as an array of content parts."),
  "status": import_zod102.z.optional(import_zod102.z.union([import_zod102.z.string(), import_zod102.z.null()]))
});

// src/gen/zod/userMessageItemParamSchema.ts
var import_zod103 = require("zod");
var userMessageItemParamSchema = import_zod103.z.object({
  "id": import_zod103.z.optional(import_zod103.z.union([import_zod103.z.string(), import_zod103.z.null()])),
  "type": import_zod103.z.enum(["message"]).default("message").describe("The item type. Always `message`."),
  "role": import_zod103.z.enum(["user"]).default("user").describe("The message role. Always `user`."),
  "content": import_zod103.z.union([import_zod103.z.array(import_zod103.z.union([import_zod103.z.lazy(() => inputTextContentParamSchema).and(import_zod103.z.object({
    "type": import_zod103.z.literal("input_text")
  })), import_zod103.z.lazy(() => inputImageContentParamAutoParamSchema).and(import_zod103.z.object({
    "type": import_zod103.z.literal("input_image")
  })), import_zod103.z.lazy(() => inputFileContentParamSchema).and(import_zod103.z.object({
    "type": import_zod103.z.literal("input_file")
  }))]).describe("A piece of message content, such as text, an image, or a file.")), import_zod103.z.string()]).describe("The message content, as an array of content parts."),
  "status": import_zod103.z.optional(import_zod103.z.union([import_zod103.z.string(), import_zod103.z.null()]))
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
