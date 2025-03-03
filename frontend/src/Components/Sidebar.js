import React from "react";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { Home, Search, Book, Info } from "lucide-react"; // Example icons
import "./Sidebar.css";
const Sidebar = ({ activeIndex, setActiveIndex }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: <Home size={30} />, text: "Home" },
    { icon: <Search size={30} />, text: "Scans History" },
    { icon: <Book size={30} />, text: "Documentation" },
    { icon: <Info size={30} />, text: "About" },
  ];
  const routes = ["/", "/scans-history", "/documentation", "/about"];
  const handleItemClick = (index) => {
    setActiveIndex(index);
    navigate(routes[index]);
  };

  return (
    <div className="sidebar">
      <img src="/nmap_logo.png" alt="Nmap Logo" className="logo" />
      {menuItems.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          text={item.text}
          isActive={index === activeIndex}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default Sidebar;
