package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ChatRequest struct {
	Message string `json:"message"`
}

type OllamaRequest struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
}

type OllamaResponse struct {
	Response string `json:"response"`
}

func ChatWithLlama(c echo.Context) error {
	var req ChatRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request format"})
	}

	ollamaReq := OllamaRequest{
		Model:  "llama3",
		Prompt: req.Message,
	}
	body, _ := json.Marshal(ollamaReq)
	resp, err := http.Post("http://ollama:11434/api/generate", "application/json", bytes.NewBuffer(body))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to communicate with Ollama API"})
	}
	defer func() {
		if err := resp.Body.Close(); err != nil {
			c.Logger().Error("Failed to close response body:", err)
		}
	}()

	var ollamaResp OllamaResponse
	var fullResponse string
	decoder := json.NewDecoder(resp.Body)
	for decoder.More() {
		if err := decoder.Decode(&ollamaResp); err == nil {
			fullResponse += ollamaResp.Response
		}
	}

	return c.JSON(http.StatusOK, map[string]string{"response": fullResponse})
}
