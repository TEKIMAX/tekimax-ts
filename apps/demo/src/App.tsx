import { useState, useEffect } from 'react';
import { useChat } from 'tekimax-ts/react';
import { Tekimax, OpenAIProvider } from 'tekimax-ts';

// Components
import { ModelSelector } from './components/ModelSelector';
import { SettingsModal } from './components/SettingsModal';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';

export default function App() {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [providerConfig, setProviderConfig] = useState({
    apiKey: localStorage.getItem("tekimax_custom_api_key") || "sk-default",
    baseURL: localStorage.getItem("tekimax_custom_base_url") || "http://localhost:8080/v1"
  });

  // Initialize the Tekimax client
  const client = new Tekimax({
    provider: new OpenAIProvider({
      apiKey: providerConfig.apiKey,
      baseURL: providerConfig.baseURL,
    })
  });

  // Re-initialize config when Settings Modal dispatches an update
  useEffect(() => {
    const handleUpdate = () => {
      setProviderConfig({
        apiKey: localStorage.getItem("tekimax_custom_api_key") || "",
        baseURL: localStorage.getItem("tekimax_custom_base_url") || "http://localhost:8080/v1"
      });
    };
    window.addEventListener('tekimax_settings_updated', handleUpdate);
    return () => window.removeEventListener('tekimax_settings_updated', handleUpdate);
  }, []);

  // Initialize the Tekimax Chat Hook
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    client,
    model: selectedModel,
  });

  return (
    <div className="flex h-screen w-full bg-black text-zinc-100 font-sans selection:bg-green-500/30">

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">

        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Tekimax
              <span className="text-green-500 ml-1">AI</span>
            </h1>

            {/* Dynamic Gateway Model Routing Box */}
            <div className="h-4 w-px bg-zinc-800 mx-2" />
            <ModelSelector
              selectedModel={selectedModel}
              onSelect={setSelectedModel}
            />
          </div>

          <div className="flex items-center gap-3">
            <SettingsModal />
          </div>
        </header>

        {/* Scrollable Message History Area */}
        <MessageList
          messages={messages as any}
        />

        {/* Floating Input Component */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-6 px-4">
          <div className="max-w-3xl mx-auto w-full relative">
            <ChatInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              hasVision={true} // Hardcoded for demo, would normally extract from ModelMeta
            />

            <p className="text-center text-xs text-zinc-600 mt-3 font-medium tracking-wide">
              Powered by <a href="https://tekimax.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-green-400 transition-colors">Tekimax SDK</a> &middot; Connected to {providerConfig.baseURL}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
