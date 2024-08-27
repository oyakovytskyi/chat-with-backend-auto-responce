import "./Sidebar.css";
import plusSvg from "../../assets/plus-circle.svg";
import { SidebarChats } from "./SidebarChats/SidebarChats";
import { TopSidebar } from "./TopSidebar/TopSidebar";
import { useState } from "react";
import { ChatModal } from "../Chat/ChatModal/ChatModal";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat-slice";

export const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChat, setEditingChat] = useState(null);
  const dispatch = useDispatch();
  const handleChatAdd = async (firstName, lastName) => {
    try {
      const response = await fetch("http://localhost:3000/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      const chat = await response.json();
      dispatch(chatActions.addChat(chat));
      dispatch(chatActions.selectChat(chat));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleChatUpdate = async (id, firstName, lastName) => {
    try {
      const response = await fetch(`http://localhost:3000/chats/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });
      const updatedChat = await response.json();
      dispatch(chatActions.updateChat(updatedChat));
      setEditingChat(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating chat:", error);
    }
  };

  const openAddModal = () => {
    setEditingChat(null);
    setIsModalOpen(true);
  };

  const openEditModal = (chat) => {
    setEditingChat(chat);
    setIsModalOpen(true);
  };

  return (
    <div className="sidebar">
      <TopSidebar />
      <SidebarChats onEditChat={openEditModal} />
      <ChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editingChat ? handleChatUpdate : handleChatAdd}
        chat={editingChat}
      />
      <img
        src={plusSvg}
        alt="Start a new chat"
        className="sidebar-img"
        width="40px"
        height="40px"
        onClick={openAddModal}
      />
    </div>
  );
};
