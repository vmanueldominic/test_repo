import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Sidebar.css";
import CollapsedLogo from "../assets/Ore.png"; // Path to collapsed logo
import ExpandedLogo from "../assets/OresightLogoBlack.png"; // Path to expanded logo
import HomeIcon from "../assets/Home.png"; // Path to home icon
import DashboardIcon from "../assets/Dashboard.png"; // Path to dashboard icon

const Sidebar = ({ onHover }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(false);
  };

  return (
    <div
      className={`sidebar ${isHovered ? "expanded" : "collapsed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar-logo">
        <img
          src={isHovered ? ExpandedLogo : CollapsedLogo}
          alt="Logo"
          className="logo"
        />
      </div>
      <ul className="sidebar-options">
        <li onClick={() => navigate("/home")}>
          <img src={HomeIcon} alt="Home" className="sidebar-icon" />
          {isHovered && <span>Home</span>}
        </li>
        <li onClick={() => navigate("/dashboard")}>
          <img src={DashboardIcon} alt="Dashboard" className="sidebar-icon" />
          {isHovered && <span>Dashboard</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
