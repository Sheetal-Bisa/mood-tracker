import os
from openai import OpenAI


class ChatGPTClient:
    def __init__(self, model: str = "gpt-3.5-turbo"):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY not set in environment variables.")
        self.client = OpenAI(api_key=self.api_key)
        self.model = model

    def generate_response(self, messages: list) -> str:
        try:
            # Prepend system message to conversation history
            system_message = {
                "role": "system",
                "content": "You are MoodMate, a warm and empathetic mood companion. You approach each conversation with the gentle understanding of a caring doctor and the warmth of a trusted friend. When greeting a user for the very first time in a conversation (only when they first say hello or introduce themselves), end your initial greeting message with a flower emoji (🌸) to symbolize care and growth. Do not use the flower emoji in subsequent messages. Listen actively, validate feelings, and provide thoughtful support while encouraging self-reflection. Your goal is to create a safe, judgment-free space where people feel heard and understood."
            }

            full_messages = [system_message] + messages

            response = self.client.chat.completions.create(
                model=self.model,
                messages=full_messages,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"[CHATGPT ERROR] {e}"


# Module-level singleton for reuse across the app
_client: ChatGPTClient | None = None


def get_client(model: str = "gpt-3.5-turbo") -> ChatGPTClient:
    """Return a singleton ChatGPTClient instance.

    This function mirrors the former `get_client` that used to live in the
    `gemini` module so `app.main` can call it on startup.
    """
    global _client
    if _client is None:
        _client = ChatGPTClient(model=model)
    return _client
