import React from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Home from "./Pages/Home";
const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Home />
      </div>
    </div>
  );
};
export default App;
