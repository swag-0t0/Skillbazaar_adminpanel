import React from "react";
import "./Topbar.scss";
import Settings from '@mui/icons-material/Settings'; 

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <img src="../../../img/SkillBazaar4.png" alt="" />
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}