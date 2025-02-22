import React from "react";
import SidebarItem from "./SidebarItem";
import { Home, Search, Book, Info } from "lucide-react"; // Example icons
import "./Sidebar.css";
const Sidebar = ({ activeIndex, setActiveIndex }) => {
  const menuItems = [
    { icon: <Home size={30} />, text: "Home" },
    { icon: <Search size={30} />, text: "Scans History" },
    { icon: <Book size={30} />, text: "Documentation" },
    { icon: <Info size={30} />, text: "About" },
  ];

  return (
    <div className="sidebar">
      <img src="/nmap_logo.png" alt="Nmap Logo" className="logo" />
      {menuItems.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          text={item.text}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
};

export default Sidebar;
