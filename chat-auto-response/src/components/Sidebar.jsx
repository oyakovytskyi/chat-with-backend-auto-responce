import "./Sidebar.css";
import { SidebarChats } from "./SidebarChats";
import { TopSidebar } from "./TopSidebar";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <TopSidebar />
      <SidebarChats />
    </div>
  );
};
