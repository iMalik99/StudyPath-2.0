import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);

export const getAIProcessing = async (query, books) => {
  try {
    // 1. We use the 'latest' alias. This is the most flexible name.
    // 2. We switch back to 'v1beta' because that is where 'latest' usually lives.
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash-latest" }, 
      { apiVersion: 'v1beta' }
    );

    const bookTitles = books.map(b => b.volumeInfo.title).join(", ");
    
    const prompt = `Topic: ${query}. Summarize these books in JSON: ${bookTitles}. 
    Format: {"insights": [{"description": "summary", "relevance": "why"}]}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    return JSON.parse(text);

  } catch (error) {
    console.error("THE FINAL ATTEMPT ERROR:", error.message);
    return null;
  }
};