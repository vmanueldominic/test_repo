import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="main-layout">
      <Sidebar onHover={setIsSidebarExpanded} />
      <div
        className={`iframe-container ${
          isSidebarExpanded ? "iframe-expanded" : "iframe-collapsed"
        }`}
      >
        <iframe
          src="https://app.powerbi.com/reportEmbed?reportId=d6b2cc45-2d87-4c6a-884c-6d710add24d6&autoAuth=true&ctid=e0793d39-0939-496d-b129-198edd916feb"
          title="Power BI Report"
          className="powerbi-iframe"
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
