import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ServiceSelector = ({ onServiceSelect, setPlatformsVisible, selectedService }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load services');
        setLoading(false);
      }
    };

    fetchServices();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (selectedService) setPlatformsVisible(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedService, setPlatformsVisible]);

  const handleSelect = (service) => {
    onServiceSelect(service.name);
    setIsOpen(false);
    setPlatformsVisible(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-900/50 text-red-200 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Select a Service</h2>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setPlatformsVisible(false);
          }}
          className="w-full bg-gray-700 text-white p-4 rounded-lg border border-gray-500 
                     focus:border-blue-400 focus:ring focus:ring-blue-400/20
                     flex justify-between items-center hover:bg-gray-600 text-lg"
        >
          <span>{selectedService || 'Choose a Service'}</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute w-full mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-xl 
                         max-h-60 overflow-y-auto z-20">
            {services.map((service) => (
              <button
                key={service._id}
                onClick={() => handleSelect(service)}
                className="w-full text-left px-4 py-3 text-white hover:bg-gray-600 
                         transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {service.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSelector;