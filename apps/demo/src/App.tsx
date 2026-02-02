import { useMemo, useState, useEffect, useRef } from 'react'
import { Tekimax, OpenAIProvider, OllamaProvider, parseThinking, fileToBase64 } from 'tekimax-ts'
import { useChat } from 'tekimax-ts/react'
import { Message as MessageUI, MessageAvatar, MessageContent } from '@/components/ui/message'
import { ChatContainerRoot, ChatContainerContent } from '@/components/ui/chat-container'
import { Reasoning, ReasoningTrigger, ReasoningContent } from '@/components/ui/reasoning'
import { ArrowUp, StopCircle, CloudLightning, Settings, Zap, KeyRound, Server, Box, RefreshCw, Hammer, Brain, Terminal, Paperclip, X } from 'lucide-react'

// Types
type ProviderType = 'openai' | 'ollama'

// Define ContentPart locally to avoid build race conditions with SDK
interface TextContentPart { type: 'text'; text: string }
interface ImageContentPart { type: 'image_url'; image_url: { url: string; detail?: 'auto' | 'low' | 'high' } }
type ContentPart = TextContentPart | ImageContentPart

interface AppConfig {
  provider: ProviderType
  apiKey?: string
  baseUrl?: string
  model: string
}

const STORAGE_KEY = 'tekimax_demo_config_v2'

// Default Configs
const DEFAULT_OPENAI_MODEL = 'gpt-4o'
const DEFAULT_OLLAMA_MODEL = 'llama3.2'
const DEFAULT_OLLAMA_URL = 'http://127.0.0.1:11434'

function App() {
  const [config, setConfig] = useState<AppConfig | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })

  // Connection Interface State
  const [selectedProvider, setSelectedProvider] = useState<ProviderType>('openai')
  const [tempApiKey, setTempApiKey] = useState('')
  const [tempBaseUrl, setTempBaseUrl] = useState(DEFAULT_OLLAMA_URL)
  const [tempModel, setTempModel] = useState(DEFAULT_OPENAI_MODEL)

  // Ollama Specific State
  const [ollamaModels, setOllamaModels] = useState<string[]>([])
  const [isFetchingModels, setIsFetchingModels] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  // Local Input State
  const [inputValue, setInputValue] = useState('')
  const [isReasoning, setIsReasoning] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null) // base64
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hydrate temp state from config if it exists (for editing)
  useEffect(() => {
    if (config) {
      setSelectedProvider(config.provider)
      setTempApiKey(config.apiKey || '')
      setTempBaseUrl(config.baseUrl || DEFAULT_OLLAMA_URL)
      setTempModel(config.model)
    }
  }, [config])

  // Reset defaults when provider changes
  useEffect(() => {
    if (selectedProvider === 'openai') {
      setTempModel(DEFAULT_OPENAI_MODEL)
    } else {
      setTempModel(DEFAULT_OLLAMA_MODEL)
      // Try to fetch models immediately if local URL and provider is ollama
      fetchOllamaModels(tempBaseUrl || DEFAULT_OLLAMA_URL)
    }
  }, [selectedProvider])

  const fetchOllamaModels = async (url: string) => {
    if (!url) return
    setIsFetchingModels(true)
    setFetchError(null)
    try {
      // Normalize URL: remove trailing slash
      const baseUrl = url.replace(/\/$/, '')
      const response = await fetch(`${baseUrl}/api/tags`)
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      const models = data.models?.map((m: any) => m.name) || []
      setOllamaModels(models)

      // Auto-select first model if current one isn't in list or is default
      if (models.length > 0) {
        const currentModelExists = models.includes(tempModel)
        if (!currentModelExists) {
          setTempModel(models[0])
        }
      }
    } catch (err) {
      console.error("Failed to fetch Ollama models", err)
      setFetchError("Connection failed. Check CORS?")
      setOllamaModels([])
    } finally {
      setIsFetchingModels(false)
    }
  }

  const client = useMemo(() => {
    if (!config) return null

    if (config.provider === 'openai') {
      return new Tekimax({
        provider: new OpenAIProvider({
          apiKey: config.apiKey!,
        })
      })
    } else if (config.provider === 'ollama') {
      return new Tekimax({
        provider: new OllamaProvider({
          host: config.baseUrl,
        })
      })
    }
    return null
  }, [config])

  // Custom Tools
  const tools = useMemo(() => ({
    getTime: {
      type: 'function' as const,
      function: {
        name: 'getTime',
        description: 'Get the current time and date.',
        parameters: {
          type: 'object',
          properties: {},
        }
      },
      execute: async () => {
        return { time: new Date().toISOString() }
      }
    },
    getWeather: {
      type: 'function' as const,
      function: {
        name: 'getWeather',
        description: 'Get the weather for a location.',
        parameters: {
          type: 'object',
          properties: {
            location: { type: 'string' }
          },
          required: ['location']
        }
      },
      execute: async ({ location }: { location: string }) => {
        // Mock weather
        return { location, temperature: 22, condition: 'Sunny with a chance of AI TEXAS' }
      }
    }
  }), [])

  const { messages, append, isLoading, setMessages } = useChat({
    client: client || undefined,
    model: config?.model || 'gpt-4o',
    tools: tools,
    think: isReasoning,
    initialMessages: [
      {
        role: 'system',
        content: `You are a helpful AI assistant with access to tools.
IMPORTANT: You should ONLY use tools when necessary.
- If the user asks a general question (e.g., "What is 1+1?", "Who is the president?", "Write a poem"), answered it DIRECTLY using your internal knowledge. DO NOT using tools for these queries.
- Only use the 'getTime' or 'getWeather' tools if the user explicitly asks for time or weather information.
- If you can answer without a tool, do so.`
      }
    ],
    onError: (err) => {
      console.error("Chat Error:", err)
      alert(`Error: ${err.message}`)
    }
  })

  // Handlers
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault()
    const newConfig: AppConfig = {
      provider: selectedProvider,
      model: tempModel,
      ...(selectedProvider === 'openai' ? { apiKey: tempApiKey } : { baseUrl: tempBaseUrl })
    }

    // Security Fix: Do NOT store API Key in localStorage
    // We only store non-sensitive config like provider, model, and base URL
    const configToStore = { ...newConfig }
    if (configToStore.provider === 'openai') {
      delete configToStore.apiKey
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(configToStore))
    setConfig(newConfig)
  }

  const handleDisconnect = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConfig(null)
    setMessages([])
    setTempApiKey('')
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64 = await fileToBase64(file)
        setSelectedImage(base64)
      } catch (err) {
        console.error("File read error", err)
      }
    }
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if ((!inputValue.trim() && !selectedImage) || !client) return

    let content: string | ContentPart[] = inputValue

    if (selectedImage) {
      content = [
        { type: 'image_url', image_url: { url: selectedImage } }
      ]
      if (inputValue.trim()) {
        (content as ContentPart[]).push({ type: 'text', text: inputValue })
      }
    }

    append({ role: 'user', content: content as any }) // Type assertion needed due to complex union resolution
    setInputValue('')
    setSelectedImage(null)
  }

  // --- Render Connection Screen ---
  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4 font-sans selection:bg-primary/20">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
          {/* Logo Group */}
          <div className="flex flex-col items-center mb-8 space-y-2">
            <div className="p-3 bg-secondary rounded-2xl border border-border shadow-2xl">
              <CloudLightning className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Tekimax Demo
            </h1>
            <p className="text-muted-foreground text-sm">Select a provider to connect</p>
          </div>

          {/* Main Card */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
            {/* Tabs */}
            <div className="grid grid-cols-2 p-1 gap-1 m-1 bg-muted rounded-xl">
              <button
                onClick={() => setSelectedProvider('openai')}
                className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${selectedProvider === 'openai'
                  ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Zap className="w-4 h-4" />
                OpenAI
              </button>
              <button
                onClick={() => setSelectedProvider('ollama')}
                className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${selectedProvider === 'ollama'
                  ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Box className="w-4 h-4" />
                Ollama
              </button>
            </div>

            <form onSubmit={handleSaveConfig} className="p-6 space-y-5">

              {selectedProvider === 'openai' ? (
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" /> API Key
                  </label>
                  <input
                    required
                    value={tempApiKey}
                    onChange={e => setTempApiKey(e.target.value)}
                    placeholder="sk-..."
                    type="password"
                    className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <p className="text-[10px] text-muted-foreground px-1">
                    Your key is stored locally in your browser and never sent to our servers.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5" /> Host URL
                    </label>
                    <button
                      type="button"
                      onClick={() => fetchOllamaModels(tempBaseUrl)}
                      disabled={isFetchingModels}
                      className="text-[10px] text-primary hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {isFetchingModels ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                      {isFetchingModels ? 'Connecting...' : 'Check Connection'}
                    </button>
                  </div>

                  <input
                    required
                    value={tempBaseUrl}
                    onChange={e => setTempBaseUrl(e.target.value)}
                    onBlur={() => fetchOllamaModels(tempBaseUrl)}
                    placeholder="http://127.0.0.1:11434"
                    className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <p className="text-[10px] text-muted-foreground px-1 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${ollamaModels.length > 0 ? 'bg-green-500' : 'bg-muted-foreground'}`}></span>
                    {fetchError ? (
                      <span className="text-destructive font-medium">{fetchError}</span>
                    ) : (
                      <span>Ensure <code>OLLAMA_ORIGINS="*"</code> is set.</span>
                    )}
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5" /> Model
                </label>

                {selectedProvider === 'ollama' && ollamaModels.length > 0 ? (
                  <div className="relative">
                    <select
                      value={tempModel}
                      onChange={e => setTempModel(e.target.value)}
                      className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      {ollamaModels.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ArrowUp className="w-4 h-4 absolute right-3 top-3 text-muted-foreground pointer-events-none rotate-180" />
                  </div>
                ) : (
                  <input
                    required
                    value={tempModel}
                    onChange={e => setTempModel(e.target.value)}
                    placeholder={selectedProvider === 'openai' ? 'gpt-4o' : 'llama3'}
                    className="w-full bg-input border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/20 transition-all"
                  />
                )}

              </div>

              <div className="pt-4">
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2">
                  Connect Provider <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // --- Render Chat Application ---
  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="h-14 border-b border-border flex justify-between items-center px-4 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <CloudLightning className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-foreground">Tekimax</span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              {config.provider === 'openai' ? <Zap className="w-3 h-3" /> : <Box className="w-3 h-3" />}
              {config.provider} &middot; {config.model}
            </span>
          </div>
        </div>
        <button
          onClick={handleDisconnect}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          title="Settings / Disconnect"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden relative">
        <ChatContainerRoot className="h-full px-4 pt-4 pb-0">
          <ChatContainerContent className="max-w-3xl mx-auto space-y-6 pb-32">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-4 bg-muted rounded-full ring-1 ring-border">
                  <CloudLightning className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-medium text-foreground">How can I help you?</h2>
                  <p className="text-sm text-muted-foreground">Connected to <span className="text-primary">{config.model}</span> via {config.provider}</p>
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              // Logic to extract content
              let contentToRender: React.ReactNode = m.content as string
              let thinkBlock: string | null = null

              if (m.thinking) {
                thinkBlock = m.thinking
                contentToRender = m.content as string
              } else if (typeof m.content === 'string') {
                const parsed = parseThinking(m.content)
                if (parsed.think) {
                  thinkBlock = parsed.think
                  contentToRender = parsed.rest
                }
              }
              else if (Array.isArray(m.content)) {
                contentToRender = (
                  <div className="space-y-2">
                    {m.content.map((c, idx) => {
                      if (c.type === 'text') return <div key={idx}>{c.text}</div>
                      if (c.type === 'image_url') {
                        const isVideo = c.image_url.url.startsWith('data:video')
                        if (isVideo) {
                          return (
                            <video key={idx} src={c.image_url.url} controls className="max-w-xs rounded-lg border border-border" />
                          )
                        }
                        return (
                          <img key={idx} src={c.image_url.url} alt="User Upload" className="max-w-xs rounded-lg border border-border" />
                        )
                      }
                      return null
                    })}
                  </div>
                )
              }

              return (
                <div key={i} className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <MessageUI className={m.role === 'user' ? 'justify-end' : ''}>
                    {m.role !== 'user' && m.role !== 'tool' && (
                      <MessageAvatar
                        src="https://github.com/tekimax.png"
                        alt="AI"
                        fallback="AI"
                        className="bg-primary text-primary-foreground ring-2 ring-background"
                      />
                    )}
                    {m.role === 'tool' ? (
                      <div className="flex gap-3 max-w-3xl w-full">
                        <div className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-muted">
                          <Terminal className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <details className="group w-full rounded-lg bg-muted/50 border border-border/50 shadow-inner open:bg-muted/80 transition-colors">
                          <summary className="flex items-center gap-2 p-3 font-semibold text-xs text-muted-foreground cursor-pointer select-none list-none">
                            <div className="flex items-center gap-2 flex-1">
                              <Hammer className="w-3 h-3" />
                              <span>Tool Output: <span className="text-foreground">{m.name}</span></span>
                            </div>
                            <div className="opacity-50 group-open:rotate-180 transition-transform">
                              <ArrowUp className="w-3 h-3" />
                            </div>
                          </summary>
                          <div className="px-3 pb-3 font-mono text-xs text-muted-foreground whitespace-pre-wrap break-all border-t border-border/30 pt-2">
                            {typeof m.content === 'string' ? m.content : JSON.stringify(m.content, null, 2)}
                          </div>
                        </details>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 max-w-3xl w-full">
                        {/* Thinking Block */}
                        {thinkBlock && (
                          <Reasoning>
                            <ReasoningTrigger>Reasoning Process</ReasoningTrigger>
                            <ReasoningContent
                              markdown
                              className="ml-2 border-l-2 border-l-muted-foreground/20 px-4 pb-2 text-muted-foreground"
                            >
                              {thinkBlock}
                            </ReasoningContent>
                          </Reasoning>
                        )}

                        {/* Tool Call Badges */}
                        {m.toolCalls?.map((tc, idx) => (
                          <div key={tc.id || idx} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full w-fit border border-border/50 animate-in fade-in slide-in-from-left-2">
                            <Hammer className="w-3 h-3" />
                            <span>Calling <span className="font-semibold text-foreground">{tc.function.name}</span>...</span>
                          </div>
                        ))}

                        {/* Main Content */}
                        {(contentToRender || (!m.toolCalls || m.toolCalls.length === 0)) && (
                          <MessageContent
                            markdown={typeof contentToRender === 'string'}
                            className={`shadow-sm ${m.role === 'user'
                              ? 'bg-primary text-primary-foreground rounded-br-none'
                              : 'bg-muted border border-border rounded-bl-none'
                              } px-4 py-3`}
                          >
                            {contentToRender}
                          </MessageContent>
                        )}
                      </div>
                    )}
                    {m.role === 'user' && (
                      <MessageAvatar
                        src=""
                        alt="User"
                        fallback="ME"
                        className="bg-muted text-muted-foreground ring-2 ring-background"
                      />
                    )}
                  </MessageUI>
                </div>
              )
            })}

            {isLoading && (
              <MessageUI className="animate-pulse">
                <MessageAvatar src="https://github.com/tekimax.png" alt="AI" fallback="AI" className="bg-muted text-muted-foreground" />
                <div className="flex items-center h-full ml-1 px-3 py-2 bg-muted rounded-lg border border-border">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </MessageUI>
            )}
          </ChatContainerContent>
        </ChatContainerRoot>

        {/* Input Area */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent pt-12 z-50">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="relative bg-background/80 backdrop-blur-xl border border-border shadow-2xl ring-1 ring-border rounded-[2rem] overflow-hidden flex items-center p-2 z-50"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileSelect}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-full transition-all duration-200 ml-1 ${selectedImage
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                title="Attach Media"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {selectedImage && (
                <div className="relative mx-2 h-10 w-10 shrink-0">
                  {selectedImage.startsWith('data:video') ? (
                    <video src={selectedImage} className="h-full w-full object-cover rounded-md border border-border" />
                  ) : (
                    <img src={selectedImage} alt="Preview" className="h-full w-full object-cover rounded-md border border-border" />
                  )}
                  <button
                    onClick={() => { setSelectedImage(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                    className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-0.5 shadow-sm hover:scale-110 transition-transform"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <input
                autoFocus
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-neutral-400 font-medium"
                placeholder={selectedImage ? "Describe this..." : `Message ${config.model}...`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setIsReasoning(!isReasoning)}
                className={`p-2 rounded-full transition-all duration-200 mr-1 ${isReasoning
                  ? 'bg-primary/20 text-primary hover:bg-primary/30'
                  : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                title="Toggle Reasoning"
              >
                <Brain className={`w-5 h-5 ${isReasoning ? 'animate-pulse' : ''}`} />
              </button>
              <button
                type="submit"
                disabled={(!inputValue.trim() && !selectedImage) && !isLoading}
                className={`p-2.5 rounded-full transition-all duration-200 flex-shrink-0 ${(inputValue.trim() || selectedImage) || isLoading
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
                  : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  }`}
              >
                {isLoading ? <StopCircle className="w-5 h-5 animate-pulse" /> : <ArrowUp className="w-5 h-5" />}
              </button>
            </form>

            <div className="text-center mt-3 text-[10px] text-muted-foreground tracking-wide uppercase">
              Powered by Tekimax SDK
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
