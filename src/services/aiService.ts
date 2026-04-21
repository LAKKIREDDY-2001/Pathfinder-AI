import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export const getCareerAdvice = async (userPrompt: string, context?: any) => {
  try {
    const systemInstruction = `
      You are the Pathfinder AI Career Assistant for Amazon employees. 
      Your goal is to help employees navigate internal growth, understand skill gaps, and feel empowered to move to new roles.
      
      Context:
      - Amazon has 1.5 million employees.
      - Many feel stuck or are "career blind".
      - You help them find internal roles based on 60-85% skill match.
      - You provide 30-60-90 day roadmaps.
      
      Current User Scenario: ${JSON.stringify(context || {})}
      
      Keep answers professional, encouraging, and concise. use "Day 1" mentality.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction,
      },
    });

    return response.text || "I'm having trouble thinking of advice right now. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I sorry, I'm experiencing a technical glitch. Let's try that again in a moment.";
  }
};
