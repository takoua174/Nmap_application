import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Documentation from "./Pages/Documentation";
import ScansHistory from "./Pages/ScansHistory";
import NetworkDiscovery from "./Components/Home-components/NetworkDiscovery";
import PortScanning from "./Components/Home-components/PortScanning";
import OSDetection from "./Components/Home-components/OSDetection";
import ServiceDetection from "./Components/Home-components/ServiceDetection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Router>
      <div className="app-container">
        <Sidebar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        <div className="main-content">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/network-discovery" element={<NetworkDiscovery />} />
              <Route path="/port-scanning" element={<PortScanning />} />
              <Route path="/os-detection" element={<OSDetection />} />
              <Route path="/service-detection" element={<ServiceDetection />} />
              <Route path="/scans-history" element={<ScansHistory />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default App;
