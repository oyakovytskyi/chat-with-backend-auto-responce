import { useSelector } from "react-redux";
import "./Chat.css";

export const Chat = () => {
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  console.log(selectedChat);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-title">{selectedChat.name}</div>
        <div className="chat-actions"></div>
      </div>
      <div className="chat-messages">
        <div className="message received">Hello!</div>
        <div className="message sent">Hi there!</div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message" />
      </div>
    </div>
  );
};
