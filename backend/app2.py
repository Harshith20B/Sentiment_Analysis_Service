from typing import Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ml_model.geolocation_based_analysis import LocationBasedAnalyzer
from dotenv import load_dotenv
import os
import logging

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Analyzer with credentials
reddit_credentials = {
    'client_id': os.getenv('REDDIT_CLIENT_ID'),
    'client_secret': os.getenv('REDDIT_CLIENT_SECRET'),
    'user_agent': 'AI-lluminati'
}
news_api_key = os.getenv('NEWS_API_KEY')
gemini_api_key = os.getenv('GEMINI_API_KEY')

if not all(reddit_credentials.values()):
    raise ValueError("Missing Reddit API credentials. Set REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, and REDDIT_USER_AGENT.")

if not news_api_key:
    raise ValueError("Missing News API key. Set NEWS_API_KEY.")

analyzer = LocationBasedAnalyzer(reddit_credentials, news_api_key, gemini_api_key)

class PlatformResponse(BaseModel):
    analyzed_content: Any
    summary: Any
    sources: Any
    aspects: Any
    location_info: Any

@app.get("/api/platforms/{country}/{platform_name}", response_model=PlatformResponse)
async def analyze_platform(country: str, platform_name: str):
    try:
        logging.debug(f"Analyzing platform: {platform_name} for country: {country}")
        # Run sentiment analysis
        result = analyze_google_play_reviews(app_id)
        
        return PlatformResponse(**results)

    except Exception as e:
        logging.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5002)