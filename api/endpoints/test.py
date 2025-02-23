from fastapi import FastAPI
from database import scans_collection
from bson import json_util
import json


api = FastAPI()

@api.get("/")
def read_root():
    cursor = scans_collection.find({})
    scans = json.loads(json_util.dumps(list(cursor)))
    return {"scans": scans}

