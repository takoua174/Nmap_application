from fastapi import APIRouter, HTTPException
from database import scans_collection
from models import Scan, ScanResult
from datetime import datetime
from bson import ObjectId
import json
from bson import json_util
import json
#Scan, ScanResult: Pydantic models used for request validation and response formatting.
import nmap

router = APIRouter()

@router.post("/scan")
async def perform_scan(target, scan_type: str = "quick"):
    if not target:
        raise HTTPException(status_code=400, detail="Bad request : Target is required !")

    nm = nmap.PortScanner()
    print(target)
    print(scan_type)
    #scan_args hia dictionnaire ema mba3ed bil get as scan_type is the key twali takou value wahda
    scan_args = {
        "quick": "-F",  
        "full": "-p-", 
        "service": "-sV",
        "host-discovery"  :"-sn",
        "ping": "-sP",
        "tcp-connect": "-sT",
        "syn": "-sS",
        "udp":"-sU",  # in case mich mrigile scan_args takou par défaut -F
        "aggressive": "-A",
    }.get(scan_type, "-F")  # in case mich mrigile scan_args takou par défaut -F
    print (scan_args)
    try:
        nm.scan(target, arguments=scan_args)
        print(nm.scaninfo())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Nmap scan failed: {str(e)}")
    # Extract and format the results
    scan_results = []
    for host in nm.all_hosts():
        for proto in nm[host].all_protocols():
            ports = nm[host][proto].keys()
            for port in ports:
                scan_results.append(ScanResult(
                    ip=host,
                    port=port,
                    state=nm[host][proto][port]["state"],
                    service=nm[host][proto][port]["name"],
                    version=nm[host][proto][port]["version"],
                ))

    # Save the scan to the database
    scan = {
        "target": target,
        "scan_type": scan_type,
        "results": [result.dict() for result in scan_results],
        "timestamp": datetime.now(),
    }
    scan_id = scans_collection.insert_one(scan).inserted_id

    return {"status": "success", "scan_id": str(scan_id), "results": scan_results}

# Fetch all scans from the database
@router.get("/scans")
async def get_scans():
    cursor = scans_collection.find({})
    scans = json_util.dumps(list(cursor), default=str)
    return {"status": "success", "scans": json.loads(scans)}
@router.post("/scan/detect_os")
async def detect_os(target):
    nm = nmap.PortScanner()
    try:
        nm.scan(target, arguments='-O')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Nmap scan failed: {str(e)}")
    os = nm[target]['osmatch'][0]['name']
    print(os)
    return {"status": "success", "os": os , "ip":target}
@router.post("/scan/network_discovery")
async def network_discovery(target,scan_type):
    nm = nmap.PortScanner()
    try:
        scan_args = {
        "host-discovery"  :"-sn",
        "ping": "-sP"
        }.get(scan_type, "-sn") 
        nm.scan(target, arguments=scan_args)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Nmap scan failed: {str(e)}")
    hosts = nm.all_hosts()
    print(hosts)
    state = nm[target].state()
    return {"status": "success", "hosts": hosts , "state": state}
# Re-run a scan by its ID
@router.post("/scans/rerun/{scan_id}")
async def rerun_scan(scan_id: str):
    # Find the scan in the database
    scan = scans_collection.find_one({"_id": ObjectId(scan_id)})
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")

    # Re-run the scan
    target = scan["target"]
    scan_type = scan["scan_type"]
    return await perform_scan(target, scan_type)