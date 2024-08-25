import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../store/chat-slice";

export const SidebarChats = () => {
  const chats = useSelector((state) => state.chats.chats);
  const dispatch = useDispatch();

  const chooseChatHandler = (chat) => {
    dispatch(chatActions.selectChat(chat));
  };

  return (
    <>
      {chats.map((chat) => (
        <div key={chat.id} className="chat-item" onClick={() => chooseChatHandler(chat)}>
          <div className="avatar"></div>
          <div className="chat-info">
            <div className="chat-name">{chat.name}</div>
            <div className="last-message">{chat.lastMessage}</div>
            <div className="chat-date">{chat.date}</div>
          </div>
        </div>
      ))}
    </>
  );
};
