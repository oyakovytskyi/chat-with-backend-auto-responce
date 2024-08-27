import { useSelector } from "react-redux";
import { ChatWindow } from "./components/Chat/ChatWindow/ChatWindow";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ChooseNotification } from "./components/Chat/Notifications/ChooseNotification";

function App() {
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  return (
    <div className="container">
      <Sidebar />
      {!selectedChat ? <ChooseNotification /> : <ChatWindow />}
    </div>
  );
}

export default App;
