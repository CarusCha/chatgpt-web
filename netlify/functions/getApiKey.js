
import fetch from "node-fetch";

export function getApiKey() {
  const apiKey = process.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key is not defined in the environment variables.");
  }
  return apiKey;
}
