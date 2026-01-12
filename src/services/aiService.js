import { GoogleGenerativeAI } from "@google/generative-ai";

// Force the version to 'v1' to avoid the 404 error
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

export const getAIProcessing = async (query, books) => {
  try {
    // We add the 'apiVersion' property here to be 100% sure
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { apiVersion: 'v1' } 
    );

    const bookTitles = books.map(b => b.volumeInfo.title).join(", ");
    
    const prompt = `
      User Topic: "${query}"
      Books: ${bookTitles}
      Provide JSON: {"intent": "...", "insights": [{"description": "...", "relevance": "..."}], "suggestions": ["..."]}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("The error is definitely:", error.message);
    return null;
  }
};