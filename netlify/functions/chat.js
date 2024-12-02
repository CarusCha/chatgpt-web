exports.handler = async function (event, context) {
  try {
    // Log event.body to debug
    console.log("Raw body:", event.body);

    // Extract the API key from the Authorization header
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized: Missing or invalid API key" }),
      };
    }
    const apiKey = authHeader.split(" ")[1];

    // Parse the body only if it's a string
    let body;
    if (typeof event.body === "string") {
      try {
        body = JSON.parse(event.body);
      } catch (parseError) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid JSON in request body" }),
        };
      }
    } else {
      body = event.body; // Assume it's already parsed
    }

    // Forward the request to OpenAI API
    const apiUrl = "https://api.openai.com/v1/chat/completions";

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
