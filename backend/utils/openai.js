const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateResponse = async (text) => {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Respond to the following user input: ${text}`,
    max_tokens: 1000,
  });
  return response.choices[0]?.text || "No response received.";
};

const analyzeText = async (text) => {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `Analyze the following text and classify it into the following writing styles:
    - Formal
    - Informal
    - Narrative
    - Persuasive

    For each style, provide a percentage in JSON format. It's not necessary for them to add up to 100. If no text is provided, return 0 for all of them.

    Example output: {"Formal": 40, "Informal": 30, "Narrative": 20, "Persuasive": 10}

    Text:
    ${text}`,
    max_tokens: 1000,
  });
  return response.choices[0]?.text.trim();
};

module.exports = { generateResponse, analyzeText };
