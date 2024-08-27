const express = require("express");
const createChatController = require("../controllers/chatController");

module.exports = (io) => {
  const router = express.Router();
  const chatController = createChatController(io);

  router.get("/", chatController.getAllChats);
  router.get("/:id", chatController.getChatById);
  router.post("/", chatController.createChat);
  router.put("/:id", chatController.updateChat);
  router.delete("/:id", chatController.deleteChat);

  return router;
};
