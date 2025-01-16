const openai = require("../utils/openai");
const { initializeUser, userChats } = require("../utils/userChats");

const getProfile = async (req, res) => {
  const userId = req.params.userId;

  initializeUser(userId);

  const allMessages = userChats[userId]
    .flatMap((chat) => chat.messages)
    .filter((msg) => msg.sender === "user")
    .map((msg) => msg.text)
    .join("\n");

  if (!allMessages) {
    return res.status(404).json({ error: "No user messages found." });
  }

  try {
    const response = await openai.analyzeText(allMessages);
    res.json({ profile: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate profile." });
  }
};

module.exports = { getProfile };
