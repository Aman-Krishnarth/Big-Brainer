const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Define the function to generate AI content based on the prompt
async function generateAIContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // Return the generated response
  } catch (error) {
    console.error("Error generating AI content:", error);
    throw error; // You can handle the error however you want
  }
}

// Example usage
// generateAIContent("Explain how AI works").then(response => console.log(response));

module.exports = { generateAIContent };
