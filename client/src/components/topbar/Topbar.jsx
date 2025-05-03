import React from "react";
import "./Topbar.scss";
import { useNavigate } from "react-router-dom";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";

export default function Topbar() {
  const Navigate = useNavigate();
  const userId = "123";

  const handleProfileClick = () => {
    Navigate(`/profile/${userId}`);
  };
  const handleLogout = () => {
    Navigate("/login");
  };
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
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
