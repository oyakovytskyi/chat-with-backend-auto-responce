const { Chat, Message } = require("../models");
const createChatController = (io) => {
  const getAllChats = async (req, res) => {
    try {
      const chats = await Chat.findAll({ include: [{ model: Message, as: "messages" }] });
      res.json(chats);
    } catch (error) {
      res.status(500).send("Error fetching chats");
    }
  };

  const getChatById = async (req, res) => {
    const { id } = req.params;
    try {
      const chat = await Chat.findByPk(id, { include: [{ model: Message, as: "messages" }] });
      if (!chat) {
        return res.status(404).send("Chat not found.");
      }
      res.json(chat);
    } catch (error) {
      res.status(500).send("Error fetching chat");
    }
  };

  const createChat = async (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return res.status(400).send("First and last names are required.");
    }

    try {
      const chat = await Chat.create({
        firstName,
        lastName,
        lastMessage: "",
        date: new Date().toLocaleDateString(),
      });
      io.emit("chatAdded", chat);
      res.status(201).json(chat);
    } catch (error) {
      res.status(500).send("Error creating chat");
    }
  };

  const updateChat = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    try {
      const chat = await Chat.findByPk(id);
      if (!chat) {
        return res.status(404).send("Chat not found.");
      }

      if (firstName && lastName) {
        chat.firstName = firstName;
        chat.lastName = lastName;
        await chat.save();
        io.emit("chatUpdated", chat);
        res.json(chat);
      } else {
        res.status(400).send("Both first and last names are required.");
      }
    } catch (error) {
      console.error("Error updating chat:", error);
      res.status(500).send("Error updating chat");
    }
  };

  const deleteChat = async (req, res) => {
    const { id } = req.params;

    try {
      const chat = await Chat.findByPk(id);
      if (!chat) {
        return res.status(404).send("Chat not found.");
      }

      await chat.destroy();
      io.emit("chatDeleted", id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send("Error deleting chat");
    }
  };

  return { getAllChats, getChatById, createChat, updateChat, deleteChat };
};

module.exports = createChatController;
