const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  socket.on("sendMessage", ({ chatId, message }) => {
    io.emit("newMessage", { chatId, message });

    const autoResponse = {
      id: Date.now(),
      chatId,
      sender: "bot",
      text: "This is an auto-response.",
      timestamp: new Date(),
    };

    setTimeout(() => {
      io.emit("newMessage", { chatId, message: autoResponse });
    }, 1000);
  });
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/chats", chatRoutes(io));
app.use("/chats", messageRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
