#!/bin/bash
source .env

echo "--- Testing OpenRouter Models ---"

test_model() {
    local model=$1
    echo "Testing $model..."
    response=$(curl -s -H "Authorization: Bearer $OPENROUTER_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"model\": \"$model\", \"messages\": [{\"role\": \"user\", \"content\": \"Test\"}], \"max_tokens\": 5}" \
        https://openrouter.ai/api/v1/chat/completions)
    
    if echo "$response" | grep -q "choices"; then
        echo "✅ SUCCESS: $model"
    else
        echo "❌ FAILED: $model"
        echo "Error: $(echo "$response" | grep -o '"message":".*"' || echo "$response")"
    fi
    echo "--------------------------------"
}

# Test models used in opencode.json
test_model "google/gemini-2.5-pro"
test_model "google/gemini-2.5-flash"
test_model "qwen/qwen-2.5-coder-32b-instruct"
test_model "nousresearch/hermes-3-llama-3.1-405b:free"
test_model "nvidia/nemotron-nano-12b-v2-vl:free"
# Test the one user mentioned
test_model "qwen/qwen2.5-vl-32b-instruct:free"

echo "--- Testing ZAI (Maia) ---"
# Assuming standard openai-compatible endpoint for zai or just printing availability
echo "Checking ZAI key format... $(echo $ZAI_API_KEY | cut -c 1-5)..."
