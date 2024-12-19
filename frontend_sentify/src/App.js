// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ServiceSelector from './components/ServiceSelector';
import PlatformList from './components/PlatformList';
import PlatformDetails from './pages/PlatformDetails';
import ContactUs from './pages/contactUs';
import AboutUs from './pages/aboutUs';

const App = () => {
  const [selectedService, setSelectedService] = useState('');
  const [platformsVisible, setPlatformsVisible] = useState(false);
  
  const handleReset = () => {
    setSelectedService('');
    setPlatformsVisible(false);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar onLogoClick={handleReset} />
          <main className="container mx-auto px-6 py-8 flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="space-y-8">
                    <div className="max-w-4xl mx-auto text-center space-y-4">
                      <h1 
                        onClick={handleReset}
                        className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer"
                      >
                        Welcome to Sentify
                      </h1>
                      <p className="text-xl text-white">
                        Analyze sentiment across multiple platforms to gain valuable insights
                      </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                      <ServiceSelector
                        onServiceSelect={setSelectedService}
                        setPlatformsVisible={setPlatformsVisible}
                        selectedService={selectedService}
                      />
                      
                      {selectedService && platformsVisible && (
                        <PlatformList selectedService={selectedService} />
                      )}
                    </div>
                  </div>
                }
              />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/platform/:id" element={<PlatformDetails />} />
            </Routes>
          </main>
          
          <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2024 Sentify. All rights reserved.</p>
                <div className="mt-4 md:mt-0 space-x-8">
                  <a href="/privacy" className="hover:text-blue-400 transition-colors duration-200">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="hover:text-blue-400 transition-colors duration-200">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
};

export default App;