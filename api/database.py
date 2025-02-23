from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["nmap_app"]  # Use the `nmap_app` database
scans_collection = db["scans"]  # Use the `scans` collection