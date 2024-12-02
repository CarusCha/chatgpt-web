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
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    // Forward the request to OpenAI API without parsing the body
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: event.body, // Directly pass the raw body
    });

    // Return the response from OpenAI API without modification
    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
      },
      body: await response.text(), // Pass the raw response body as text
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};