import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PlatformList = ({ selectedService }) => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    if (selectedService) {
      axios
        .get(`http://localhost:5000/api/platforms?service=${selectedService}`)
        .then((response) => setPlatforms(response.data))
        .catch((error) => console.error('Error fetching platforms:', error));
    }
  }, [selectedService]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-gray-100">
        Platforms for {selectedService}
      </h2>
      {platforms.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {platforms.map((platform) => (
            <motion.div key={platform._id} variants={item}>
              <Link
                to={`/platform/${platform._id}`}
                className="block p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-xl 
                         transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  {platform.name}
                </h3>
                <p className="text-gray-300 line-clamp-2">
                  {platform.description || 'No description available'}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-400 text-center py-8">No platforms found.</p>
      )}
    </div>
  );
};

export default PlatformList;