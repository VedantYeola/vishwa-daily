import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY is missing! Please check your .env.local file.");
}

const genAI = new GoogleGenerativeAI(API_KEY || '');

// List of models to try in order of preference/stability
const MODELS_TO_TRY = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-exp",
  "gemini-2.5-flash",
  "gemini-2.5-pro"
];

const getWorkingModel = async (prompt: string, isJson: boolean = false): Promise<string> => {
  let lastError = null;

  for (const modelName of MODELS_TO_TRY) {
    try {
      console.log(`Attempting model: ${modelName}`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
        // specific config for 2.0 or 1.5 models if needed
        generationConfig: isJson && !modelName.includes("1.0-pro") ? { responseMimeType: "application/json" } : undefined
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.warn(`Model ${modelName} failed:`, error.message || error);
      lastError = error;

      // If quota exceeded (429), we might want to stop or try a different class of model
      // But 404 means "try next".
      if (String(error).includes("429")) {
        // Continue trying others, maybe one has a different quota bucket?
      }
    }
  }
  throw lastError || new Error("All models failed");
};

export const summarizeArticle = async (content: string): Promise<string> => {
  try {
    return await getWorkingModel(`Summarize the following news article into 3 clear, punchy bullet points: \n\n${content}`);
  } catch (error) {
    console.error("Summary failed all models:", error);
    return "The AI is currently catching up on news. Please try again later.";
  }
};

export const generateNewsInsight = async (topic: string): Promise<string> => {
  try {
    return await getWorkingModel(`Provide a quick expert-style insight or trend analysis about the topic "${topic}" in the context of today's world. Keep it under 100 words.`);
  } catch (error) {
    console.error("Insight failed all models:", error);
    return "No insights available.";
  }
};

const CACHE_PREFIX = 'chronicle_news_cache_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const generateNewsArticles = async (category?: string, skipCache: boolean = false): Promise<any[]> => {
  const cacheKey = `${CACHE_PREFIX}${category || 'home'}`;

  // 1. Check Cache
  if (!skipCache) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Check if cache is still valid
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          console.log(`Using cached news for: ${category || 'home'}`);
          return parsed.data;
        }
      } catch (e) {
        console.warn("Invalid cache data, fetching fresh...");
        localStorage.removeItem(cacheKey);
      }
    }
  }

  const prompt = category
    ? `You are a news API. Today is ${new Date().toISOString().split('T')[0]}. Generate 6 distinct, realistic, high-quality news articles for the category "${category}". Do not use markdown formatting. Return ONLY a raw JSON array. Structure: [{ "id": "unique_string", "title": "Catchy Headline", "excerpt": "Brief summary", "content": "Detailed 2-paragraph content", "author": "Full Name", "publishedAt": "${new Date().toISOString().split('T')[0]}", "category": "${category}", "readTime": "X min" }]`
    : `You are a news API. Today is ${new Date().toISOString().split('T')[0]}. Generate 6 distinct, realistic, high-quality breaking news articles covering Tech, World, Science, and Lifestyle. Do not use markdown formatting. Return ONLY a raw JSON array. Structure: [{ "id": "unique_string", "title": "Catchy Headline", "excerpt": "Brief summary", "content": "Detailed 2-paragraph content", "author": "Full Name", "publishedAt": "${new Date().toISOString().split('T')[0]}", "category": "CategoryName", "readTime": "X min" }]`;

  try {
    // We pass true for isJson, but the helper handles model-specific config
    let text = await getWorkingModel(prompt, true);

    // Clean up potential markdown formatting
    text = text.replace(/```json|```/g, '').trim();
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1) {
      text = text.substring(firstBracket, lastBracket + 1);
    }

    const data = JSON.parse(text);

    // 2. Save to Cache
    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: data
    }));

    return data;
  } catch (error) {
    console.error("News generation failed all models:", error);
    return [];
  }
};

export const testConnection = async (): Promise<{ success: boolean; message?: string }> => {
  try {
    await getWorkingModel("ping");
    return { success: true };
  } catch (error: any) {
    let errorMessage = "Connection failed";
    if (error.message && error.message.includes("429")) errorMessage = "Quota Exceeded (All Models)";
    else if (error.message && error.message.includes("404")) errorMessage = "No Models Found (Check API Key)";
    else if (error.message && error.message.includes("403")) errorMessage = "Invalid API Key (403)";
    else if (error.message) errorMessage = error.message;

    else if (error.message) errorMessage = error.message;

    return { success: false, message: errorMessage };
  }
};

// Debug function to check available models
export const checkAvailableModels = async () => {
  if (!API_KEY) return;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    if (!response.ok) {
      console.error(`Failed to list models: ${response.status} ${response.statusText}`);
      return;
    }
    const data = await response.json();
    console.log("Available Models:", data);
  } catch (error) {
    console.error("Failed to list models:", error);
  }
};
