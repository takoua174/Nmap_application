import React, { useState } from "react";
import axios from "axios";
import "./Styles.css";

const PortScanning = () => {
  const [target, setTarget] = useState("");
  const [result, setResult] = useState(null);
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
        `http://127.0.0.1:8000/api/scan/detect_os?target=${target}&scan_type=os`
      );
      setResult(response.data);
      console.log(response.data);
    } catch (err) {
      setError("An error occurred while scanning. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="network-discovery-container">
      <h1>Os Detection</h1>
      <p className="subtitle">Detect the operating system of a target.</p>

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

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Start Scan Button */}
      <button onClick={handleScan} disabled={isLoading}>
        {isLoading ? "Scanning..." : "Start Scan"}
      </button>
      <p className="subtitle">Result :</p>
      {/* Scan Results */}
      {result && (
        <div className="results-section">
          <h2>Scan Results</h2>
          <table>
            <thead>
              <tr>
                <th>IP Address</th>
                <th>OS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{result.ip}</td>
                <td>{result.os}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PortScanning;
