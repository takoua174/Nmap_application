from fastapi import FastAPI
from endpoints.scans import router as scans_router

app = FastAPI()

# Include the scans router
app.include_router(scans_router, prefix="/api")

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Nmap Scanner API!"}