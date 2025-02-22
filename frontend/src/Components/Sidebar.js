import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { Home, Search, Book, Info } from "lucide-react"; // Example icons
import "./Sidebar.css";
const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { icon: <Home size={20} />, text: "Home" },
    { icon: <Search size={20} />, text: "Scans History" },
    { icon: <Book size={20} />, text: "Documentation" },
    { icon: <Info size={20} />, text: "About" },
  ];

  return (
    <div className="sidebar">
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
