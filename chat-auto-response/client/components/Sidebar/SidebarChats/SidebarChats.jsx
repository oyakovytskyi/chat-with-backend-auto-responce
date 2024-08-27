import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../store/chat-slice";
import { useEffect } from "react";
import { ChooseNotification } from "../../Chat/Notifications/ChooseNotification";
import deleteIcon from "../../../assets/delete.svg";
import editIcon from "../../../assets/edit.svg";

import "./SidebarChats.css";

export const SidebarChats = ({ onEditChat }) => {
  const chats = useSelector((state) => state.chats.chats);
  const dispatch = useDispatch();

  const fetchChats = async () => {
    const response = await fetch(`http://localhost:3000/chats`);
    const data = await response.json();
    dispatch(chatActions.existedChats(data));
    return data;
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const chooseChatHandler = (chat) => {
    dispatch(chatActions.selectChat(chat));
  };

  const deleteChatHandler = async (chatId) => {
    try {
      await fetch(`http://localhost:3000/chats/${chatId}`, {
        method: "DELETE",
      });

      dispatch(chatActions.deleteChat(chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <>
      {chats ? (
        chats.map((chat) => (
          <div key={chat.id} className="chat-item" onClick={() => chooseChatHandler(chat)}>
            <img
              src="https://picsum.photos/40/40?random=1"
              alt="Bot avatar"
              className="chat-avatar"
            />
            <div className="chat-info">
              <div className="chat-name">{`${chat.firstName} ${chat.lastName}`}</div>
              <div className="last-message">{chat.lastMessage}</div>
              <div className="chat-date">{chat.date}</div>
            </div>
            <button className="chat-delete-btn" onClick={() => deleteChatHandler(chat.id)}>
              <img src={deleteIcon} alt="Delete" />
            </button>
            <button className="chat-edit-btn" onClick={() => onEditChat(chat)}>
              <img src={editIcon} alt="Edit" />
            </button>
          </div>
        ))
      ) : (
        <ChooseNotification />
      )}
    </>
  );
};
