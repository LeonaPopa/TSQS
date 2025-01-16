const express = require("express");
const {
  createChat,
  getChats,
  getChatById,
  addMessageToChat,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/:userId", createChat);
router.get("/:userId", getChats);
router.get("/:userId/:chatId", getChatById);
router.post("/:userId/:chatId", addMessageToChat);

module.exports = router;
