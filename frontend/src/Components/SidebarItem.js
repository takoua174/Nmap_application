import React from "react";
import "./SidebarItem.css";
const SidebarItem = ({ icon, text, isActive, onClick }) => {
  return (
    <div
      className={`sidebar-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-text">{text}</span>
    </div>
  );
};

export default SidebarItem;
