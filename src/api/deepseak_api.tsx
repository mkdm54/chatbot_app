// src/utils/api.ts
import { OPENROUTER_API_KEY } from "@/expo-env.d";

export const fetchOpenRouterResponse = async (prompt: string) => {
  const API_KEY = OPENROUTER_API_KEY;
  const URL = "http://localhost:8081";
  const APP_NAME = "NOVA AI";

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": URL,
          "X-Title": APP_NAME,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-v3-base:free",
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
