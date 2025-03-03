import React from "react";
//import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  //const navigate = useNavigate();

  const scanOptions = [
    {
      title: "Network Discovery",
      description: "Discover active devices on your network.",
      icon: "🌐",
      route: "/network-discovery",
    },
    {
      title: "Port Scanning",
      description: "Scan for open ports on a target.",
      icon: "🔍",
      route: "/port-scanning",
    },
    {
      title: "OS Detection",
      description: "Detect the operating system of a target.",
      icon: "💻",
      route: "os-detection",
    },
    {
      title: "Service Version Detection",
      description: "Identify services and their versions.",
      icon: "🛠️",
      route: "/service-detection",
    },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to Nmap Scanner</h1>
      <p className="subtitle">Choose a scan type to get started.</p>

      <div className="card-grid">
        {scanOptions.map((option, index) => (
          <div
            key={index}
            className="card"
            //onClick={() => navigate(option.route)}
          >
            <div className="card-icon">{option.icon}</div>
            <h2>{option.title}</h2>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
