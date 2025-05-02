import "./Sidebar.scss";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  WorkOutline,
  ChatBubbleOutline,
  Add,
  Remove,
  Menu,
  Close,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleManage = () => setIsManageOpen(!isManageOpen);

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? <Close /> : <Menu />}
      </div>

      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className={`sidebarListItem ${currentPath === "/" ? "active" : ""}`}>
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </Link>
              <Link to="/analytics" className="link">
                <li className={`sidebarListItem ${currentPath === "/analytics" ? "active" : ""}`}>
                  <Timeline className="sidebarIcon" />
                  Analytics
                </li>
              </Link>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className={`sidebarListItem ${currentPath === "/users" ? "active" : ""}`}>
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <li className="sidebarListItem" onClick={toggleManage}>
                <WorkOutline className="sidebarIcon" />
                Manage
                {isManageOpen ? <Remove className="toggleIcon" /> : <Add className="toggleIcon" />}
              </li>
              {isManageOpen && (
                <ul className="submenuList">
                  <li className="submenuItem">Add Moderators</li>
                  <li className="submenuItem">Add Category</li>
                  <li className="submenuItem">Add Advertisement</li>
                </ul>
              )}
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
