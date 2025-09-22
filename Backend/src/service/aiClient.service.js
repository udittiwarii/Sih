const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function classifyByAI({ imageBase64, descriptionText }) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      { inlineData: { data: imageBase64, mimeType: "image/jpeg" } },
      { text: `Classify the type of waste and write a short auto-description. User text: ${descriptionText}` }
    ]);

    const response = result.response.text(); // Gemini’s output
    // parse and return structured { category, autoDescription }
    return JSON.parse(response);

  } catch (err) {
    console.error("AI classification failed:", err);
    return { category: "General Waste", autoDescription: descriptionText || "General waste observed" };
  }
}

module.exports = { classifyByAI };
