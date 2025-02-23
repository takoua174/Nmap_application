from datetime import datetime
from pydantic import BaseModel

class ScanResult(BaseModel):
    ip: str
    port: int
    state: str
    service: str
    version: str

class Scan(BaseModel):
    target: str
    scan_type: str
    results: list[ScanResult]
    timestamp: datetime = datetime.now()