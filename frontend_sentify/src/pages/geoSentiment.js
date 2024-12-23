import React, { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp,
  TrendingDown,
  MinusCircle,
  BarChart2,
  AlertCircle,
  Search,
  Loader2,
  ExternalLink
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const GeoSentiment = () => {
  const [searchInput, setSearchInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [platformName, setPlatformName] = useState('');
  const [country, setCountry] = useState('');
  const [platformData, setPlatformData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlatformDetails = useCallback(async (name, country) => {
    if (!name.trim() || !country.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5002/api/platforms/${country}/${name}`);
      if (!response.ok) throw new Error('Failed to fetch platform data');
      const data = await response.json();
      setPlatformData(data);
    } catch (err) {
      setError(err.message || 'Failed to load platform details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlatformName(searchInput);
    setCountry(countryInput);
    fetchPlatformDetails(searchInput, countryInput);
  };

  // Calculate metrics from analyzed content
  const calculateMetrics = (data) => {
    if (!data?.analyzed_content?.length) return {};
    
    const sentiments = data.analyzed_content.map(content => content.sentiment.score);
    const emotions = data.analyzed_content.map(content => ({
      emotion: content.emotions.emotion,
      confidence: content.emotions.confidence
    }));

    // Calculate sentiment distribution
    const sentimentDistribution = sentiments.reduce((acc, score) => {
      const category = score >= 70 ? 'Positive' : score >= 40 ? 'Neutral' : 'Negative';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Calculate emotion distribution
    const emotionCount = emotions.reduce((acc, curr) => {
      acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
      return acc;
    }, {});

    const overallSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    const dominantEmotion = Object.entries(emotionCount)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Not Available';

    return {
      overallSentiment: overallSentiment.toFixed(1),
      dominantEmotion,
      sentimentDistribution,
      emotionCount
    };
  };

  const SearchBar = () => (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
          placeholder="Enter country..."
          className="w-full px-6 py-4 pl-14 rounded-xl border-2 border-gray-200 
                   dark:border-gray-700 bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-gray-100 text-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-400 dark:placeholder-gray-500
                   transition-all duration-300 ease-in-out
                   group-hover:border-blue-400 dark:group-hover:border-blue-600 mb-4"
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter platform name to analyze..."
          className="w-full px-6 py-4 pl-14 rounded-xl border-2 border-gray-200 
                   dark:border-gray-700 bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-gray-100 text-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   placeholder-gray-400 dark:placeholder-gray-500"
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 
                        w-6 h-6 text-gray-400 group-hover:text-blue-500 
                        transition-colors duration-300" />
        <button
          type="submit"
          disabled={loading || !searchInput.trim() || !countryInput.trim()}
          className="absolute right-3 top-1/2 transform -translate-y-1/2
                   px-6 py-2 bg-blue-600 hover:bg-blue-700 
                   text-white rounded-lg flex items-center gap-2 
                   disabled:bg-gray-400 disabled:cursor-not-allowed
                   transition-all duration-300 ease-in-out
                   focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze
            </>
          )}
        </button>
      </form>
    </div>
  );

  const COLORS = ['#22c55e', '#eab308', '#ef4444'];

  const metrics = calculateMetrics(platformData);
  const sentimentChartData = metrics.sentimentDistribution ? 
    Object.entries(metrics.sentimentDistribution).map(([name, value]) => ({
      name,
      value
    })) : [];

  const emotionChartData = metrics.emotionCount ?
    Object.entries(metrics.emotionCount).map(([name, value]) => ({
      name,
      value
    })) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center 
                       text-gray-900 dark:text-gray-100 mb-8">
            Platform Analysis Dashboard
          </h1>
          <SearchBar />
        </div>

        {error ? (
          <div className="p-6 bg-red-50 dark:bg-red-900/50 border-2 
                       border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        ) : platformData && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Metrics Cards */}
            <div className="col-span-full lg:col-span-1 space-y-6">
              {/* Overall Metrics */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Overall Metrics
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 
                               bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-300">Sentiment Score</span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {metrics.overallSentiment || 'N/A'}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 
                               bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-300">Dominant Emotion</span>
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {metrics.dominantEmotion}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
                {platformData?.summary && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Analysis Summary
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300">
                        {platformData.summary}
                      </p>
                    </div>
                  </div>
                )}

              {/* Sentiment Distribution Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Sentiment Distribution
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sentimentChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Analyzed Content */}
            <div className="col-span-full lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Recent Analysis
                </h2>
                <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
                  {platformData.analyzed_content?.slice(0, 10).map((content, index) => (
                    <div key={index} 
                         className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg 
                                  hover:shadow-md transition-shadow duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-blue-600 dark:text-blue-400">
                          {content.title || 'Untitled Content'}
                        </h3>
                        <a
                          href={content.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-gray-500 
                                   hover:text-blue-500 transition-colors duration-200"
                        >
                          View Source <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Source: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {content.source || 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Sentiment: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {content.sentiment.label} ({content.sentiment.score}%)
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">Emotion: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {content.emotions.emotion} ({(content.emotions.confidence * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-400">VADER Score: </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {content.sentiment.raw_scores.vader.toFixed(3)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!platformData.analyzed_content || platformData.analyzed_content.length === 0) && (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      No analysis data available
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Emotion Distribution Chart */}
            {emotionChartData.length > 0 && (
              <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Emotion Distribution
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emotionChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Aspect Sentiments */}
            {Object.keys(platformData.analyzed_content?.[0]?.aspect_sentiments || {}).length > 0 && (
              <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Aspect Analysis</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(platformData.analyzed_content[0].aspect_sentiments).map(([aspect, data]) => (
                    <div key={aspect} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 capitalize mb-2">{aspect}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Score:</span>
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {data.score?.toFixed(1) || 'N/A'}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Mentions:</span>
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {data.count || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeoSentiment;