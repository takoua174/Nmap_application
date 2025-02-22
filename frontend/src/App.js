import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Documentation from "./Pages/Documentation";
import ScansHistory from "./Pages/ScansHistory";
import "./App.css";
const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuComponents = [
    <Home />,
    <ScansHistory />,
    <Documentation />,
    <About />,
  ];
  return (
    <div className="app-container">
      <Sidebar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className="main-content">
        <Header />
        <div className="content">{menuComponents[activeIndex]}</div>
      </div>
    </div>
  );
};
export default App;
