import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ScansHistory.css";

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/scans");
        setScans(response.data);
      } catch (err) {
        console.error("Failed to fetch scans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const handleReRunScan = async (scanId) => {
    try {
      const response = await axios.post(`/api/scans/${scanId}/rerun`);
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
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr key={scan.id}>
                <td>{scan.target}</td>
                <td>{scan.scanType}</td>
                <td>{new Date(scan.timestamp).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleReRunScan(scan.id)}>
                    Re-run
                  </button>
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
