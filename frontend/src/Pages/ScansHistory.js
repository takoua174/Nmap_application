import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScansHistory.css";

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/scans`);
        if (response.data && Array.isArray(response.data.scans)) {
          setScans(response.data.scans);
          console.log(response.data.scans);
        }
      } catch (err) {
        console.error("Failed to fetch scans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const handleReRunScan = async (scanId) => {
    console.log("Re-running scan with ID:", scanId);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/scans/rerun/${scanId}`
      );
      alert("Scan re-run successfully!");
      console.log("Re-run results:", response.data);
    } catch (err) {
      console.error("Failed to re-run scan:", err);
    }
  };

  return (
    <div className="scan-history-container">
      <h1>Scan History</h1>
      {loading ? (
        <p>Loading scan history...</p>
      ) : scans.length === 0 ? (
        <p>No scans found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Target</th>
              <th>Scan Type</th>
              <th>Date</th>
              <th>Actions</th>
              <th>Results</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan._id.$oid}>
                <td>{scan.target}</td>
                <td>{scan.scan_type}</td>
                <td>{new Date(scan.timestamp.$date).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleReRunScan(scan._id.$oid)}>
                    Re-run
                  </button>
                </td>
                <td>
                  <details>
                    <summary>View Details</summary>
                    <ul>
                      {scan.results.map((result, index) => (
                        <li key={index}>
                          <strong>IP:</strong> {result.ip},{" "}
                          <strong>Port:</strong> {result.port},{" "}
                          <strong>State:</strong> {result.state},{" "}
                          <strong>Service:</strong> {result.service},{" "}
                          <strong>Version:</strong> {result.version}
                        </li>
                      ))}
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScanHistory;
