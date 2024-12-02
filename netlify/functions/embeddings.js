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
    const apiUrl = "https://api.openai.com/v1/embeddings";

    // Forward the request to OpenAI API without parsing the body
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: event.body, // Directly pass the raw body
    });

    // Return the streaming response as-is to the client
    const streamHeaders = {
      "Content-Type": response.headers.get("Content-Type") || "application/json",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    };

    return new Promise((resolve) => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let streamBody = "";

      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            resolve({
              statusCode: response.status,
              headers: streamHeaders,
              body: streamBody,
            });
            return;
          }

          // Decode and append the chunk
          streamBody += decoder.decode(value, { stream: true });
          read();
        });
      }

      read();
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
