const { Server } = require("socket.io");

const configureSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("sendMessage", async ({ chatId, message }) => {
      io.emit("newMessage", { chatId, message });
    });
  });

  return io;
};

module.exports = configureSocketIO;
