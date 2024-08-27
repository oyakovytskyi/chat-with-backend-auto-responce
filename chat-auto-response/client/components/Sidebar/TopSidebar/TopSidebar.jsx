import userImg from "../../../assets/user.png";
import "./TopSidebar.css";

export const TopSidebar = () => {
  return (
    <div className="top-sidebar">
      <div className="chat-user">
        <img src={userImg} alt="User" width="40px" height="40px" className="user-img" />
        <button className="chat-login">Log in</button>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};
