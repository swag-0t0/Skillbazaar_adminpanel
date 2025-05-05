import React from "react";
import "./Topbar.scss";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axiosConfig";

export default function Topbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const { isLoading, error, data: adminData } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: async () => {
      const response = await api.get("/auth/verify");
      console.log("Admin Data:", response.data.user);
      return response.data.user;

    },
  });

  const handleProfileClick = () => {
    if (adminData?.id) {
      navigate(`/profile/${adminData.id}`);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Show loading state
  if (isLoading) return <div className="loading">Loading...</div>;

  // Show error state
  if (error) return <div className="error">Error loading profile</div>;

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src="../../../img/SkillBazaar4.png" alt="" />
        </div>
        <div className="topRight">
          <PowerSettingsNewOutlinedIcon
            className="logout"
            onClick={handleLogout}
          />
          <img
            onClick={handleProfileClick}
            src={adminData?.image || "https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
            alt={adminData?.fullname || "Admin"}
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
