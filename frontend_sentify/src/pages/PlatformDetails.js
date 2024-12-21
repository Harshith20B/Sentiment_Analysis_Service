import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  MinusCircle,
  Newspaper,
  BarChart2,
  AlertCircle,
} from 'lucide-react';

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
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl mt-8 p-6 bg-red-100 dark:bg-red-900 border border-red-400 rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          <div>
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
              Error Loading Platform Data
            </h2>
            <p className="text-red-500 dark:text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const { platform, news, reviews } = platformData;

  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.3) return 'text-green-600 dark:text-green-400';
    if (sentiment < -0.3) return 'text-red-600 dark:text-red-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  const SentimentIcon = ({ sentiment, className }) => {
    if (sentiment > 0.3) return <TrendingUp className={`${className} text-green-600 dark:text-green-400`} />;
    if (sentiment < -0.3) return <TrendingDown className={`${className} text-red-600 dark:text-red-400`} />;
    return <MinusCircle className={`${className} text-yellow-600 dark:text-yellow-400`} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Platform Header */}
        <div className="bg-white dark:bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {platform.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{platform.description}</p>
          </div>
        </div>

        {/* Sentiment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <BarChart2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-gray-600 dark:text-gray-400">Overall Sentiment</p>
                <p
                  className={`text-2xl font-bold ${getSentimentColor(
                    (news.overallSentiment + reviews.overallSentiment) / 2
                  )}`}
                >
                  {(((news.overallSentiment + reviews.overallSentiment) / 2) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* News and Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* News Section */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                News Analysis
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {news.topNews.map((article, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{article.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <SentimentIcon sentiment={article.sentiment} className="w-4 h-4" />
                      <span className={`text-sm font-medium ${getSentimentColor(article.sentiment)}`}>
                        {(article.sentiment * 100).toFixed(1)}%
                      </span>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                Reviews Analysis
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {reviews.topReviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{review.text}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <SentimentIcon sentiment={review.sentiment} className="w-4 h-4" />
                      <span className={`text-sm font-medium ${getSentimentColor(review.sentiment)}`}>
                        {(review.sentiment * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformDetails;
