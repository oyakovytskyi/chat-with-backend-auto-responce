import { useState, useEffect } from "react";
import "./ChatModal.css";

export const ChatModal = ({ isOpen, onClose, onSave, chat }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (chat) {
      setFirstName(chat.firstName);
      setLastName(chat.lastName);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [chat]);

  const handleSave = () => {
    if (chat) {
      onSave(chat.id, firstName, lastName);
    } else {
      onSave(firstName, lastName);
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>{chat ? "Edit Chat" : "New Chat"}</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
