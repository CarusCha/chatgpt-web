
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const { OPENAI_API_KEY } = process.env;
    const apiUrl = "https://api.openai.com/v1/embeddings";

    const body = JSON.parse(event.body);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
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
