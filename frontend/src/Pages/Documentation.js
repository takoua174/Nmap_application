import React from "react";
import "./Documentation.css"; // Import the CSS file for styling

const Documentation = () => {
  return (
    <div className="documentation-container">
      {/* Heading */}
      <div className="documentation-header">
        <h1>Documentation</h1>
        <p className="subtitle">Learn how to use Nmap Scanner effectively.</p>
      </div>

      {/* Table of Contents */}
      <div className="table-of-contents">
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#getting-started">Getting Started</a>
          </li>
          <li>
            <a href="#scan-types">Scan Types</a>
          </li>
          <li>
            <a href="#interpreting-results">Interpreting Results</a>
          </li>
          <li>
            <a href="#faqs">FAQs</a>
          </li>
        </ul>
      </div>

      {/* Getting Started */}
      <div id="getting-started" className="documentation-section">
        <h2>Getting Started</h2>
        <p>
          Welcome to Nmap Scanner! Follow these steps to start scanning your
          network:
        </p>
        <ol>
          <li>
            <strong>Enter a Target</strong>: Type an IP address, domain, or
            range (e.g., <code>192.168.1.1</code> or <code>example.com</code>).
          </li>
          <li>
            <strong>Choose a Scan Type</strong>: Select from Quick Scan, Full
            Scan, OS Detection, or Custom Scan.
          </li>
          <li>
            <strong>Run the Scan</strong>: Click the "Start Scan" button and
            wait for the results.
          </li>
          <li>
            <strong>View Results</strong>: Analyze the scan results, including
            open ports, services, and OS information.
          </li>
        </ol>
      </div>

      {/* Scan Types */}
      <div id="scan-types" className="documentation-section">
        <h2>Scan Types</h2>
        <p>Nmap Scanner supports various scan types to suit your needs:</p>
        <ul>
          <li>
            <strong>Quick Scan</strong>: Scans the most common ports for open
            services.
          </li>
          <li>
            <strong>Full Scan</strong>: Scans all 65,535 ports on the target.
          </li>
          <li>
            <strong>OS Detection</strong>: Attempts to detect the operating
            system of the target.
          </li>
          <li>
            <strong>Service Version Detection</strong>: Identifies the versions
            of services running on open ports.
          </li>
          <li>
            <strong>Custom Scan</strong>: Allows you to input custom Nmap
            commands for advanced scanning.
          </li>
        </ul>
      </div>

      {/* Interpreting Results */}
      <div id="interpreting-results" className="documentation-section">
        <h2>Interpreting Results</h2>
        <p>
          After a scan is complete, you'll see a table of results. Here's how to
          interpret them:
        </p>
        <table>
          <thead>
            <tr>
              <th>Column</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>IP Address</strong>
              </td>
              <td>The target's IP address or hostname.</td>
            </tr>
            <tr>
              <td>
                <strong>Port</strong>
              </td>
              <td>The port number being scanned.</td>
            </tr>
            <tr>
              <td>
                <strong>State</strong>
              </td>
              <td>
                Whether the port is <code>open</code>, <code>closed</code>, or{" "}
                <code>filtered</code>.
              </td>
            </tr>
            <tr>
              <td>
                <strong>Service</strong>
              </td>
              <td>The service running on the port (e.g., HTTP, SSH).</td>
            </tr>
            <tr>
              <td>
                <strong>Version</strong>
              </td>
              <td>The version of the service (if detected).</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FAQs */}
      <div id="faqs" className="documentation-section">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <div className="faq">
          <h3>What is Nmap?</h3>
          <p>
            Nmap (Network Mapper) is a free and open-source tool for network
            discovery and security auditing. It is widely used to scan networks,
            identify devices, and detect open ports and services.
          </p>
        </div>
        <div className="faq">
          <h3>Is Nmap Scanner free to use?</h3>
          <p>
            Yes, Nmap Scanner is completely free to use. It is built on the
            open-source Nmap tool.
          </p>
        </div>
        <div className="faq">
          <h3>Can I scan multiple targets at once?</h3>
          <p>
            Yes, you can scan multiple targets by entering a range of IP
            addresses (e.g., <code>192.168.1.1-100</code>).
          </p>
        </div>
        <div className="faq">
          <h3>How do I export scan results?</h3>
          <p>
            After a scan is complete, click the "Export" button to download the
            results in CSV, JSON, or XML format.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
