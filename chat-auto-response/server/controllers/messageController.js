const { Chat, Message } = require("../models");
const getRandomQuote = require("../services/quoteService");
const io = require("../config/socket.io");

const postMessage = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const chat = await Chat.findByPk(id);
    if (!chat) return res.status(404).send("Chat not found.");

    if (!message) return res.status(400).send("Message content is required.");

    const userMessage = await Message.create({
      text: message,
      sender: "user",
      ChatId: chat.id,
    });

    chat.lastMessage = message;
    chat.date = new Date().toLocaleDateString();
    await chat.save();

    setTimeout(async () => {
      try {
        const quote = await getRandomQuote();
        const botMessage = await Message.create({
          text: quote,
          sender: "bot",
          ChatId: chat.id,
        });

        chat.lastMessage = quote;
        chat.date = new Date().toLocaleDateString();
        await chat.save();
        res.status(201).json(botMessage);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    }, 3000);

    res.status(201).json(userMessage);
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).send("Error sending message");
  }
};

module.exports = { postMessage };
