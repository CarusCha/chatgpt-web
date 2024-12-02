
const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  try {
    const { OPENAI_API_KEY } = process.env;
    const apiUrl = "https://api.openai.com/v1/models";

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
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
