import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TrendingUp,
  TrendingDown,
  MinusCircle,
  BarChart2,
  AlertCircle,
} from 'lucide-react';

const PlatformDetails = ({ platformName }) => {
  const [platformData, setPlatformData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  useEffect(() => {
    const fetchPlatformDetails = async () => {
      if (!platformName) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5001/api/platforms/${platformName}`);
        if (response.data) {
          setPlatformData(response.data);
        } else {
          throw new Error("No data received from API");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load platform details. Please try again.');
        setLoading(false);
      }
    };

    setLoading(true);
    setError(null);
    fetchPlatformDetails();
  }, [platformName]);

  const getSentimentColor = (sentiment) => {
    if (sentiment > 60) return 'text-green-600 dark:text-green-400';
    if (sentiment < 40) return 'text-red-600 dark:text-red-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'Upward') return <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />;
    if (trend === 'Downward') return <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />;
    return <MinusCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />;
  };

  const toggleSummary = () => {
    setIsSummaryExpanded(!isSummaryExpanded);
  };

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

  const { analyzed_content, summary, trend, aspects } = platformData || {};
  const overallSentiment = trend?.confidence ? (trend.confidence * 100).toFixed(1) : "N/A";
  const dominantEmotion = trend?.trend || "No data available";
  const shortSummary = summary?.slice(0, 200); // Shortened summary for preview

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Platform Header */}
        <div className="bg-white dark:bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {platformName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Sentiment analysis and insights for {platformName}.
            </p>
          </div>
        </div>

        {/* Sentiment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6 flex items-center space-x-4">
            <BarChart2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-gray-600 dark:text-gray-400">Overall Sentiment</p>
              <p className={`text-2xl font-bold ${getSentimentColor(overallSentiment)}`}>
                {overallSentiment}%
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6 flex items-center space-x-4">
            {getTrendIcon(dominantEmotion)}
            <div>
              <p className="text-gray-600 dark:text-gray-400">Dominant Emotion</p>
              <p className="text-2xl font-bold">{dominantEmotion}</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Summary</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            {isSummaryExpanded ? summary : `${shortSummary}...`}
          </p>
          {summary?.length > 200 && (
            <button
              onClick={toggleSummary}
              className="mt-2 text-blue-500 hover:underline"
            >
              {isSummaryExpanded ? 'Show Less' : 'Load More'}
            </button>
          )}
        </div>

        {/* Aspects Analysis */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Aspects Analysis</h2>
          <ul className="mt-4 space-y-4">
            {Object.entries(aspects || {}).map(([aspect, value]) => (
              <li key={aspect} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300 capitalize">{aspect}</span>
                <span className={`text-lg font-bold ${getSentimentColor(value.avg_score)}`}>
                  {(value.avg_score || 0).toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Analyzed Content */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Analyzed Content</h2>
          <div className="mt-4 space-y-4">
            {analyzed_content?.length > 0 ? (
              analyzed_content.map((content, index) => (
                <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    <a href={content.url} target="_blank" rel="noopener noreferrer">
                      {content.title || "No title"}
                    </a>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sentiment: {content.sentiment.label} ({content.sentiment.score}/100)
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No content available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformDetails;