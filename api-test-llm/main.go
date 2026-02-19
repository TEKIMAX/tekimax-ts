package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// Model represents an AI model available through the proxy.
type Model struct {
	ID      string `json:"id"`
	Object  string `json:"object"`
	Created int64  `json:"created"`
	OwnedBy string `json:"owned_by"`
	// Custom metadata to indicate capabilities to the frontend
	Meta ModelMeta `json:"meta"`
}

type ModelMeta struct {
	Vision bool `json:"vision"`
	Tools  bool `json:"tools"`
	Audio  bool `json:"audio"`
}

type ModelsResponse struct {
	Object string  `json:"object"`
	Data   []Model `json:"data"`
}

// Mock database of models available
var modelsDB = []Model{
	{
		ID:      "claude-4.6-sonnet",
		Object:  "model",
		Created: time.Now().Unix(),
		OwnedBy: "anthropic",
		Meta: ModelMeta{
			Vision: true,
			Tools:  true,
			Audio:  false,
		},
	},
	{
		ID:      "gpt-4o",
		Object:  "model",
		Created: time.Now().Unix(),
		OwnedBy: "openai",
		Meta: ModelMeta{
			Vision: true,
			Tools:  true,
			Audio:  true,
		},
	},
	{
		ID:      "llama-3-8b",
		Object:  "model",
		Created: time.Now().Unix(),
		OwnedBy: "meta",
		Meta: ModelMeta{
			Vision: false,
			Tools:  false,
			Audio:  false,
		},
	},
}

func modelsHandler(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers for testing from a browser UI
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		return
	}

	response := ModelsResponse{
		Object: "list",
		Data:   modelsDB,
	}

	json.NewEncoder(w).Encode(response)
}

func chatHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	if r.Method == "OPTIONS" {
		return
	}

	// This is a mock chat completion endpoint that just echoes back success.
	// In a real proxy, it would forward the request to the upstream provider based on the model ID.
	response := map[string]interface{}{
		"id":      fmt.Sprintf("chatcmpl-%d", time.Now().Unix()),
		"object":  "chat.completion",
		"created": time.Now().Unix(),
		"model":   "mock-proxy-model",
		"choices": []map[string]interface{}{
			{
				"index": 0,
				"message": map[string]string{
					"role":    "assistant",
					"content": "Hello from the dynamic model proxy! You successfully routed a request.",
				},
				"finish_reason": "stop",
			},
		},
	}

	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/v1/models", modelsHandler)
	http.HandleFunc("/v1/chat/completions", chatHandler)

	fmt.Println("Dynamic Model Proxy running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
