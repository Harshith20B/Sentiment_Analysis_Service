# backend/app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from ml.sentimentAnalysis import EnhancedContentAnalyzer
import os

app = Flask(__name__)
CORS(app)

# Initialize Analyzer with credentials
reddit_credentials = {
    'client_id': os.getenv('REDDIT_CLIENT_ID'),
    'client_secret': os.getenv('REDDIT_CLIENT_SECRET'),
    'user_agent': 'AI-lluminati'
}
news_api_key = os.getenv('NEWS_API_KEY')
analyzer = EnhancedContentAnalyzer(reddit_credentials, news_api_key)

@app.route('/analyze', methods=['POST'])
def analyze_query():
    data = request.json
    query = data.get('query', '')
    aspects = data.get('aspects', ["price", "features", "reliability", "support"])
    
    if not query:
        return jsonify({'error': 'Query is required'}), 400
    
    results = analyzer.analyze_query(query, aspects)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
