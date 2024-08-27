import { useSelector } from "react-redux";
import sendSvg from "../../../assets/send.svg";
import botImg from "../../../assets/user.png";
import "./ChatWindow.css";
import { useEffect, useState } from "react";

export const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  useEffect(() => {
    const fetchChat = async () => {
      const response = await fetch(`http://localhost:3000/chats/${selectedChat.id}`);
      const chat = await response.json();
      setMessages(chat.messages);
    };

    fetchChat();
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!messageInput) {
      alert("Please enter a message.");
      return;
    }

    const response = await fetch(`http://localhost:3000/chats/${selectedChat.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageInput }),
    });

    if (response.ok) {
      const message = await response.json();
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageInput("");
    } else {
      console.error("Failed to send message:", response.statusText);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-title">{`${selectedChat.firstName} ${selectedChat.lastName}`}</div>
        <div className="chat-actions"></div>
      </div>
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.sender}`}>
          {message.sender === "bot" && <img src={botImg} alt="Bot" className="bot-photo" />}
          <div className="message-text">{message.text}</div>
          <div className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</div>
        </div>
      ))}
      <div className="chat-input">
        <img src={sendSvg} alt="send" onClick={sendMessage} />
        <input
          type="text"
          placeholder="Type a message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
      </div>
    </div>
  );
};
