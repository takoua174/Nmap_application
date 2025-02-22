import React from "react";
import "./About.css";
const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Nmap Scanner</h1>
        <p className="subtitle">
          Your go-to tool for network exploration and security auditing.
        </p>
      </div>
      <div className="about-section">
        <h2>What is Nmap Scanner?</h2>
        <p>
          Nmap Scanner is a powerful web-based application that allows you to
          perform network scans using the Nmap tool. Whether you're a network
          administrator, a security professional, or a curious user, this app
          helps you discover devices, analyze open ports, and identify services
          running on your network.
        </p>
        <p>
          With an intuitive interface and robust features, Nmap Scanner makes
          network scanning accessible to everyone.
        </p>
      </div>
      <div className="about-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Network Discovery</h3>
            <p>
              Find all devices connected to your network with just a few clicks.
            </p>
          </div>
          <div className="feature-card">
            <h3>Port Scanning</h3>
            <p>
              Detect open, closed, and filtered ports to understand your
              network's security.
            </p>
          </div>
          <div className="feature-card">
            <h3>Service Detection</h3>
            <p>Identify services running on open ports and their versions.</p>
          </div>
        </div>
      </div>
      <div className="about-footer">
        <p>© 2025 Nmap Scanner. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;
