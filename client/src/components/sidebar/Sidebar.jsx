import "./Sidebar.scss";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  WorkOutline,
  Menu,
  Close,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? <Close /> : <Menu />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className="sidebarListItem active">
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </Link>
              <Link to="/analytics" className="link">
              <li className="sidebarListItem">
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
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Reports
              </li>
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </ul>
          </div>

          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
