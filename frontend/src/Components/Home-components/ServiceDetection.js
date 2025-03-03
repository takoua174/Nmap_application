import React, { useState } from "react";
import axios from "axios";
import "./Styles.css";

const ServiceDetection = () => {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("ping");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!target) {
      setError("Please enter a target.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/scan?target=${target}&scan_type=${scanType}`
      );

      if (response.data && Array.isArray(response.data.results)) {
        setResults(response.data.results);
      } else {
        setError("Invalid response format from the server.");
      }
    } catch (err) {
      setError("An error occurred while scanning. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="network-discovery-container">
      <h1>Service Detection</h1>
      <p className="subtitle">Identify services and their versions.</p>

      {/* Target Input */}
      <div className="input-section">
        <label htmlFor="target">Target:</label>
        <input
          type="text"
          id="target"
          placeholder="Enter target (e.g., 192.168.1.0/24)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </div>

      {/* Scan Type Selection */}
      <div className="input-section">
        <label htmlFor="scanType">Scan Type:</label>
        <select
          id="scanType"
          value={scanType}
          onChange={(e) => setScanType(e.target.value)}
        >
          <option value="service">Service Detection (-sV)</option>
          <option value="aggressive">Aggressive Scan (-A)</option>
        </select>
      </div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Start Scan Button */}
      <button onClick={handleScan} disabled={isLoading}>
        {isLoading ? "Scanning..." : "Start Scan"}
      </button>

      {/* Scan Results */}
      {results && (
        <div className="results-section">
          <h2>Scan Results</h2>
          <table>
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Port</th>
                <th>Service</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.ip}</td>
                  <td>{result.port}</td>
                  <td>{result.service}</td>
                  <td>{result.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServiceDetection;
