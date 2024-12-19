import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PlatformDetails = () => {
  const { id } = useParams();
  const [platformData, setPlatformData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlatformDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/platforms/${id}`);
        setPlatformData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlatformDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/50 text-red-200 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  const { platform, news, reviews } = platformData;

  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.3) return 'text-green-400';
    if (sentiment < -0.3) return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="p-6">
      {/* Platform Header */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-4">{platform.name}</h1>
        <p className="text-gray-300 mb-4">{platform.description}</p>
      </div>

      {/* Responsive Grid for News and Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* News Analysis */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">News Sentiment Analysis</h2>
          {news.error ? (
            <p className="text-red-400">{news.error}</p>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-xl mb-2">Overall Sentiment:</p>
                <p className={`text-2xl font-bold ${getSentimentColor(news.overallSentiment)}`}>
                  {(news.overallSentiment * 100).toFixed(1)}%
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-100">Top Impactful News</h3>
                {news.topNews.map((article, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-400 mb-2">{article.title}</h4>
                    <p className="text-gray-300 mb-2">{article.description}</p>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className={`font-medium ${getSentimentColor(article.sentiment)}`}>
                        Sentiment: {(article.sentiment * 100).toFixed(1)}%
                      </span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Reviews Analysis */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">User Reviews Analysis</h2>
          {reviews.error ? (
            <p className="text-red-400">{reviews.error}</p>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-xl mb-2">Overall Review Sentiment:</p>
                <p className={`text-2xl font-bold ${getSentimentColor(reviews.overallSentiment)}`}>
                  {(reviews.overallSentiment * 100).toFixed(1)}%
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-100">Most Impactful Reviews</h3>
                {reviews.topReviews.map((review, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-300 mb-2">{review.text}</p>
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <span className={`font-medium ${getSentimentColor(review.sentiment)}`}>
                        Sentiment: {(review.sentiment * 100).toFixed(1)}%
                      </span>
                      <span className="text-gray-400">
                        Rating: {review.score}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformDetails;