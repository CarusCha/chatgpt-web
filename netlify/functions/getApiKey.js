
const fetch = require("node-fetch");

exports.getApiKey = function () {
  const apiKey = process.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key is not defined in the environment variables.");
  }
  return apiKey;
};
