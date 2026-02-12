<div align="center">

# 🔍 Nmap Scanner — Web Application

**A modern, full-stack network scanning platform powered by Nmap**

[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

_Scan networks, detect services, and track results — all from your browser._

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

## Overview

Nmap Scanner is a full-stack web application that wraps the industry-standard [Nmap](https://nmap.org/) network scanner in a clean, intuitive web interface. Instead of memorizing command-line flags, users can launch scans, browse results, and re-run previous scans with a single click — all while every scan is automatically persisted to a MongoDB database for auditing and analysis.

Built with a **FastAPI** backend for high-performance async API handling and a **React 19** frontend for a responsive, single-page experience.

---

## ✨ Features

| Feature                  | Description                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| **Multiple Scan Types**  | Quick, Full (all 65,535 ports), OS Detection, and Service Version Detection scans          |
| **Real-Time Results**    | Scan results displayed instantly in a structured table (IP, Port, State, Service, Version) |
| **Scan History**         | Every scan is persisted to MongoDB with full metadata and results                          |
| **One-Click Re-Run**     | Re-run any historical scan directly from the Scan History page                             |
| **RESTful API**          | Clean API endpoints — easily integrate with scripts or other tools                         |
| **In-App Documentation** | Built-in documentation page with scan guides, FAQs, and result interpretation tips         |
| **Modern UI**            | Dark-themed interface with sidebar navigation and responsive layout                        |

---

## 🏗 Architecture

```
┌──────────────────────┐        HTTP         ┌──────────────────────┐
│                      │  ◄──────────────►   │                      │
│   React Frontend     │    localhost:3000    │   FastAPI Backend    │
│   (Single-Page App)  │                     │    localhost:8000     │
│                      │                     │                      │
│  • Home (Scanner)    │    /api/scan ───►   │  • Nmap Integration  │
│  • Scan History      │    /api/scans ──►   │  • Data Validation   │
│  • Documentation     │    /api/scans/ ─►   │  • CORS Middleware   │
│  • About             │      rerun/{id}     │                      │
│                      │                     │                      │
└──────────────────────┘                     └─────────┬────────────┘
                                                       │
                                                       │ pymongo
                                                       ▼
                                             ┌──────────────────────┐
                                             │     MongoDB          │
                                             │  nmap_app.scans      │
                                             │  localhost:27017      │
                                             └──────────────────────┘
```

---

## 🛠 Tech Stack

### Backend

- **FastAPI** — High-performance async Python web framework
- **python-nmap** — Python bindings for Nmap scanner
- **Pydantic** — Data validation and serialization via models (`Scan`, `ScanResult`)
- **PyMongo** — MongoDB driver for Python
- **Uvicorn** — ASGI server

### Frontend

- **React 19** — Component-based UI library
- **Axios** — Promise-based HTTP client for API communication
- **Lucide React** — Modern icon set for the sidebar navigation
- **CSS3** — Custom dark-themed styling with responsive layout

### Database

- **MongoDB** — NoSQL document store for flexible scan result storage

---

## 📂 Project Structure

```
Nmap_application/
│
├── api/                          # ── Backend (FastAPI) ──
│   ├── main.py                   # App entry point, CORS config, router registration
│   ├── models.py                 # Pydantic models (Scan, ScanResult)
│   ├── database.py               # MongoDB connection & collection setup
│   └── endpoints/
│       ├── scans.py              # Core scan endpoints (POST /scan, GET /scans, POST /rerun)
│       └── test.py               # Development/test endpoint
│
├── frontend/                     # ── Frontend (React) ──
│   ├── package.json              # Dependencies & scripts
│   ├── public/
│   │   └── index.html            # HTML shell
│   └── src/
│       ├── App.js                # Root component with page routing
│       ├── App.css               # Global dark-theme styles
│       ├── Components/
│       │   ├── Header.js/.css    # Top navigation bar
│       │   ├── Sidebar.js/.css   # Side navigation with icons
│       │   └── SidebarItem.js/.css
│       └── Pages/
│           ├── Home.js/.css      # Scanner interface (target input, scan type, results table)
│           ├── ScansHistory.js/.css  # Historical scans with re-run capability
│           ├── Documentation.js/.css # User guide and FAQs
│           └── About.js/.css     # Project information
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Purpose                                     |
| ----------- | ------- | ------------------------------------------- |
| **Python**  | 3.8+    | Backend runtime                             |
| **Node.js** | 14+     | Frontend tooling                            |
| **MongoDB** | 4.4+    | Data persistence                            |
| **Nmap**    | 7.80+   | Network scanning engine (must be on `PATH`) |

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Nmap_application.git
cd Nmap_application
```

### 2. Backend Setup

```bash
# Navigate to the API directory
cd api

# (Recommended) Create a virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# Install dependencies
pip install fastapi uvicorn pymongo python-nmap

# Start the API server
uvicorn main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**.

### 3. Frontend Setup

```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will launch at **http://localhost:3000** and automatically connect to the backend API.

### 4. Start MongoDB

Make sure MongoDB is running locally on port `27017`. The app will automatically create the `nmap_app` database and `scans` collection on first use.

```bash
# Default MongoDB start (varies by installation)
mongod --dbpath /data/db
```

---

## 📡 API Reference

All endpoints are prefixed with `/api`.

| Method | Endpoint                     | Description                              | Parameters                                                    |
| ------ | ---------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| `GET`  | `/`                          | Health check                             | —                                                             |
| `POST` | `/api/scan`                  | Execute a new Nmap scan                  | `target` (required), `scan_type` (optional, default: `quick`) |
| `GET`  | `/api/scans`                 | Retrieve all saved scans                 | —                                                             |
| `POST` | `/api/scans/rerun/{scan_id}` | Re-run a previous scan by its MongoDB ID | `scan_id` (path)                                              |

### Scan Types

| Type      | Nmap Flag | Description                                              |
| --------- | --------- | -------------------------------------------------------- |
| `quick`   | `-F`      | Fast scan — top 100 most common ports                    |
| `full`    | `-p-`     | Full scan — all 65,535 ports                             |
| `os`      | `-O`      | OS detection — identify the target's operating system    |
| `service` | `-sV`     | Service version detection — identify software & versions |

### Example Requests

```bash
# Quick scan on a target
curl -X POST "http://localhost:8000/api/scan?target=192.168.1.1&scan_type=quick"

# Full port scan
curl -X POST "http://localhost:8000/api/scan?target=example.com&scan_type=full"

# Fetch all historical scans
curl http://localhost:8000/api/scans

# Re-run a scan by its ID
curl -X POST "http://localhost:8000/api/scans/rerun/64f1a2b3c4d5e6f7a8b9c0d1"
```

### Example Response

```json
{
  "status": "success",
  "scan_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "results": [
    {
      "ip": "192.168.1.1",
      "port": 22,
      "state": "open",
      "service": "ssh",
      "version": "OpenSSH 8.9"
    },
    {
      "ip": "192.168.1.1",
      "port": 80,
      "state": "open",
      "service": "http",
      "version": "nginx 1.18.0"
    }
  ]
}
```

---

## 💡 Usage

1. **Open the app** in your browser at `http://localhost:3000`
2. **Enter a target** — an IP address (e.g., `192.168.1.1`), domain (e.g., `example.com`), or CIDR range
3. **Select a scan type** — Quick, Full, OS Detection, or Service Version
4. **Click "Start Scan"** — results appear in a table with IP, port, state, service, and version info
5. **View history** — navigate to the Scan History page to browse all previous scans
6. **Re-run scans** — click the "Re-run" button on any historical scan to execute it again with the same parameters

---

## 🖼 Screenshots

> _Add screenshots of your application here to showcase the UI._
>
> Suggested screenshots:
>
> - Home page with the scan form
> - Scan results table
> - Scan History page with re-run buttons
> - Documentation page

---

## ⚠️ Security & Legal Notice

> **Important:** Running Nmap against systems you do not own or have explicit permission to scan may be **illegal**. Only scan networks and hosts you are authorized to test. This tool is intended for **educational purposes and authorized security auditing only**.

- Consider adding authentication and rate-limiting before exposing this application beyond a trusted development environment.
- Never expose the API to the public internet without proper access controls.

---

## 🗺 Roadmap

- [ ] Add authentication & API key support
- [ ] Custom scan arguments input from the frontend
- [ ] Export scan results to CSV / PDF
- [ ] Real-time scan progress via WebSockets
- [ ] Docker Compose for one-command deployment
- [ ] Dark/light theme toggle
- [ ] Dashboard with scan statistics and visualizations

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is provided as-is for demonstration and educational purposes.

---

<div align="center">

**Built by Takoua Ayadi**

_For questions or collaboration, feel free to open an issue._

</div>
