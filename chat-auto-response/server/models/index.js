const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("chatapp", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

const Chat = sequelize.define("Chat", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastMessage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Chat.hasMany(Message, { as: "messages" });
Message.belongsTo(Chat);

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synchronized successfully."))
  .catch((err) => console.error("Error synchronizing the database:", err));

module.exports = { Chat, Message };
