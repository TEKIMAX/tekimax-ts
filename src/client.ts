import type { CreateResponseBody, ResponseResource } from './gen/types'

/**
 * A wrapper around the raw API response that provides helper methods
 * for common tasks like extracting text content.
 */
export class TekimaxResponse {
  constructor(private readonly _raw: ResponseResource) {}

  /**
   * Access the raw response object returned by the API.
   */
  get raw(): ResponseResource {
    return this._raw
  }

  /**
   * Automatically extracts the text content from the response.
   * It looks for the first "output_text" item in the response content.
   */
  get text(): string | undefined {
    for (const item of this._raw.output) {
      if (item.type === 'message') {
        for (const contentPart of item.content) {
          if (
            contentPart.type === 'output_text' ||
            contentPart.type === 'text'
          ) {
            return contentPart.text
          }
        }
      }
    }
    return undefined
  }

  /**
   * The ID of the response.
   */
  get id(): string | undefined {
    return this._raw.id
  }

  /**
   * The model used to generate the response.
   */
  get model(): string | undefined {
    return this._raw.model
  }
}

/**
 * Options for sending a message or creating a session.
 */
export type MessageOptions = Omit<CreateResponseBody, 'input' | 'stream'>

/**
 * The main client for interacting with the Tekimax API.
 */
export class TekimaxClient {
  private baseUrl: string
  private headers: HeadersInit

  /**
   * Creates a new TekimaxClient.
   *
   * @param options - Configuration options for the client.
   * @param options.baseUrl - The base URL of the API (default: "https://api.tekimax.com").
   * @param options.apiKey - Your Tekimax API key.
   *
   * @example
   * const client = new TekimaxClient({ apiKey: "tm_..." });
   */
  constructor(options: { baseUrl?: string; apiKey?: string } = {}) {
    this.baseUrl = options.baseUrl || 'https://api.tekimax.com'
    this.headers = {
      'Content-Type': 'application/json',
      ...(options.apiKey ? { Authorization: `Bearer ${options.apiKey}` } : {}),
    }
  }

  private async request(path: string, body: any): Promise<TekimaxResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(
        `Tekimax API Error: ${response.status} ${response.statusText}`,
      )
    }

    const data = (await response.json()) as ResponseResource
    return new TekimaxResponse(data)
  }

  /**
   * Creates a new session and sends the initial message.
   *
   * @param message - The initial message text to start the session.
   * @param options - Additional configuration options (model, temperature, etc.).
   *
   * @example
   * const response = await client.createSession("Hello, world!", { model: "gpt-4" });
   * console.log(response.text);
   */
  async createSession(
    message: string,
    options?: MessageOptions,
  ): Promise<TekimaxResponse> {
    const body: CreateResponseBody = {
      ...options,
      input: message,
    }
    return this.request('/responses', body)
  }

  /**
   * Sends a message to an existing session or starts a new one if no previous_response_id is provided.
   *
   * @param message - The message text to send.
   * @param options - Additional configuration options.
   *
   * @example
   * const response = await client.sendMessage("What is the weather?", {
   *   previous_response_id: "resp_123"
   * });
   * console.log(response.text);
   */
  async sendMessage(
    message: string,
    options?: MessageOptions,
  ): Promise<TekimaxResponse> {
    return this.createSession(message, options)
  }
}
