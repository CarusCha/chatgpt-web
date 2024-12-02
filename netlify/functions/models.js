
import { getApiKey } from './getApiKey';

exports.handler = async function (event, context) {
  try {
    const apiKey = getApiKey();
    const apiUrl = "https://api.openai.com/v1/models";

    const body = JSON.parse(event.body);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
