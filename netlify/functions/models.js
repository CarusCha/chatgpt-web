exports.handler = async function (event, context) {
  try {
    // Extract the API key from the Authorization header
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized: Missing or invalid API key" }),
      };
    }
    const apiKey = authHeader.split(" ")[1];

    // OpenAI API endpoint
    const apiUrl = "https://api.openai.com/v1/models";

    // Forward the GET request to OpenAI API
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Return the response from OpenAI API without modification
    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
      },
      body: await response.text(),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
