const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const userId = "123";
const userConversations = {};

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  if (!userConversations[userId]) {
    userConversations[userId] = [];
  }
  userConversations[userId].push({ prompt });

  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: "Tell me more about my writing style based on what i wrote here: " + prompt,
      max_tokens: 1000,
    });

    res.json({ text: response.choices[0]?.text || "No response received." });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

app.get("/api/profile/:userId", async (req, res) => {
  const userId = req.params.userId;

  const conversations = userConversations[userId];
  if (!conversations || conversations.length === 0) {
    return res.status(404).json({ error: "No conversations found." });
  }

  const text = conversations
    .map((conv) => `${conv.prompt}`)
    .join("\n");

  try {
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

    res.json({ profile: response.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate profile." });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
