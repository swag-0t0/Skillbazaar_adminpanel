import "./Sidebar.scss";
import api from '../../utils/axiosConfig'; // Fixed import path
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
import { useQuery } from '@tanstack/react-query'; // Changed from 'react-query'

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Get current user role using React Query
  const { data: currentUser } = useQuery({
    queryKey: ['adminProfile'],
    queryFn: () => api.get('/auth/verify').then(res => res.data.user)
  });

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
                <li
                  className={`sidebarListItem ${
                    currentPath === "/" ? "active" : ""
                  }`}
                >
                  <LineStyle className="sidebarIcon" />
                  Home
                </li>
              </Link>
              <Link to="/analytics" className="link">
                <li
                  className={`sidebarListItem ${
                    currentPath === "/analytics" ? "active" : ""
                  }`}
                >
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
                <li
                  className={`sidebarListItem ${
                    currentPath === "/users" ? "active" : ""
                  }`}
                >
                  <PermIdentity className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <li className="sidebarListItem" onClick={toggleManage}>
                <WorkOutline className="sidebarIcon" />
                Manage
                {isManageOpen ? (
                  <Remove className="toggleIcon" />
                ) : (
                  <Add className="toggleIcon" />
                )}
              </li>
              {isManageOpen && (
                <ul className="submenuList">
                  {currentUser?.role === 'admin' && (
                    <Link to="/moderators" className="link">
                      <li
                        className={`sidebarListItem ${
                          currentPath === "/moderators" ? "active" : ""
                        }`}
                      >
                        Add Moderators
                      </li>
                    </Link>
                  )}
                  <Link to="/categories" className="link">
                    <li
                      className={`sidebarListItem ${
                        currentPath === "/categories" ? "active" : ""
                      }`}
                    >
                      Add Categories
                    </li>
                  </Link>
                  <Link to="/advertisements" className="link">
                    <li
                      className={`sidebarListItem ${
                        currentPath === "/advertisements" ? "active" : ""
                      }`}
                    >
                      Add Advertisements
                    </li>
                  </Link>
                </ul>
              )}
              <Link to="/message" className="link">
                <li
                  className={`sidebarListItem ${
                    currentPath === "/message" ? "active" : ""
                  }`}
                >
                  <ChatBubbleOutline className="sidebarIcon" />
                  Queries
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

