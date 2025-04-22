// src/utils/api.ts
export const fetchOpenRouterResponse = async (prompt: string) => {
  const OPENROUTER_API_KEY =
    "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";
  const URL = "http://localhost:8081";
  const APP_NAME = "NOVA AI";

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": URL,
          "X-Title": APP_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Maaf, terjadi kesalahan dalam memproses permintaan Anda.";
  }
};
