from fastapi import FastAPI, HTTPException
import httpx
import re

app = FastAPI()

# Nmap API configuration
NMAP_API_URL = "https://api.nmap.online/v1/scan"  # Replace with the actual API URL
NMAP_API_KEY = "your_nmap_api_key_here"  # Replace with your API key

# Function to validate the target (e.g., IP address or domain)
def is_valid_target(target: str) -> bool:
    # Regex to validate IP address or domain
    ip_regex = r"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
    domain_regex = r"^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$"
    return re.match(ip_regex, target) or re.match(domain_regex, target)

# Function to perform the Nmap scan using the external API
async def perform_nmap_scan(target: str, scan_type: str = "quick") -> dict:
    # Define scan arguments based on scan type
    scan_args = {
        "quick": "-F",  # Fast scan (common ports)
        "full": "-p-",  # Full scan (all ports)
        "os": "-O",     # OS detection
        "service": "-sV",  # Service version detection
    }.get(scan_type, "-F")  # Default to quick scan

    # Prepare the request payload
    payload = {
        "target": target,
        "args": scan_args,
        "api_key": NMAP_API_KEY,
    }

    try:
        # Make the API request
        async with httpx.AsyncClient() as client:
            response = await client.post(NMAP_API_URL, json=payload, timeout=30.0)
            response.raise_for_status()  # Raise an error for bad status codes
            return response.json()  # Return the scan results
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=500, detail=f"Nmap API request failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# Endpoint to start a scan
@app.post("/scan")
async def start_scan(target: str, scan_type: str = "quick"):
    if not is_valid_target(target):
        raise HTTPException(status_code=400, detail="Invalid target")

    try:
        # Perform the Nmap scan using the external API
        results = await perform_nmap_scan(target, scan_type)
        return {"status": "success", "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))