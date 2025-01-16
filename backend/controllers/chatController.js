const openai = require("../utils/openai");
const { initializeUser, userChats } = require("../utils/userChats");

const createChat = (req, res) => {
  const userId = req.params.userId;
  initializeUser(userId);

  const newChat = {
    id: `chat-${Date.now()}`,
    messages: [],
  };

  userChats[userId].push(newChat);
  res.json(newChat);
};

const getChats = (req, res) => {
  const userId = req.params.userId;
  initializeUser(userId);
  res.json(userChats[userId]);
};

const getChatById = (req, res) => {
  const { userId, chatId } = req.params;
  initializeUser(userId);

  const chat = userChats[userId].find((c) => c.id === chatId);
  if (!chat) {
    return res.status(404).json({ error: "Chat not found" });
  }

  res.json(chat);
};

const addMessageToChat = async (req, res) => {
  const { userId, chatId } = req.params;
  const { message } = req.body;

  if (!message || !message.text) {
    return res.status(400).json({ error: "Message text is required" });
  }

  initializeUser(userId);

  const chat = userChats[userId].find((c) => c.id === chatId);
  if (!chat) {
    return res.status(404).json({ error: "Chat not found" });
  }

  const userMessage = { sender: "user", text: message.text };
  chat.messages.push(userMessage);

  try {
    const response = await openai.generateResponse(message.text);

    const openAiMessage = {
      sender: "openai",
      text: response,
    };

    chat.messages.push(openAiMessage);

    res.json(chat);
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
};

module.exports = {
  createChat,
  getChats,
  getChatById,
  addMessageToChat,
};
