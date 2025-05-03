import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Analytics from "./pages/analytics/Analytics";
import Users from "./pages/users/Users";
import Moderators from "./pages/moderators/Moderators";
import Categories from "./pages/categories/Categories";
import Message from "./pages/message/Message";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import "./App.scss";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Topbar />}
      <div className="container">
        {!isLoginPage && <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" replace />} />
          <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" replace />} />
          <Route path="/moderators" element={isAuthenticated ? <Moderators /> : <Navigate to="/login" replace />} />
          <Route path="/categories" element={isAuthenticated ? <Categories /> : <Navigate to="/login" replace />} />
          <Route path="/message" element={isAuthenticated ? <Message /> : <Navigate to="/login" replace />} />
          <Route path="/profile/:id" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
