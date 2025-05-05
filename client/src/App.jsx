import React, { useState, useEffect } from "react";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  
  // Create a new QueryClient instance
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 300000, // 5 minutes
      },
    },
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth/verify", {
          withCredentials: true
        });
        
        setIsAuthenticated(response.data.isValid);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <>
        {!isLoginPage && isAuthenticated && (
          <Topbar setIsAuthenticated={setIsAuthenticated} />
        )}
        <div className="container">
          {!isLoginPage && isAuthenticated && <Sidebar />}
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                  <Navigate to="/" replace /> : 
                  <Login setIsAuthenticated={setIsAuthenticated} />
              } 
            />
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
    </QueryClientProvider>
  );
}

export default App;
