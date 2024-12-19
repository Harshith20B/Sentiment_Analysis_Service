import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Github } from 'lucide-react';
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
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-gray-100 min-h-screen">
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar onLogoClick={handleReset} />
          
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-12"
                  >
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                      <div className="flex justify-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block"
                        >
                          <h1 
                            onClick={handleReset}
                            className="group flex items-center justify-center space-x-3 cursor-pointer"
                          >
                            <Sparkles className="w-10 h-10 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
                            <span className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                              Sentify
                            </span>
                          </h1>
                        </motion.div>
                      </div>
                      
                      <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto">
                        Unlock powerful insights with our advanced sentiment analysis across multiple platforms
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-4 pt-4">
                        <Link 
                          to="/about"
                          className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 
                                   text-white font-medium transition-colors duration-200"
                        >
                          Learn More
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                        <a
                          href="https://github.com/yourusername/sentify"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 
                                   text-gray-300 font-medium border border-gray-700 transition-colors duration-200"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View on GitHub
                        </a>
                      </div>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-8">
                      <ServiceSelector
                        onServiceSelect={setSelectedService}
                        setPlatformsVisible={setPlatformsVisible}
                        selectedService={selectedService}
                      />
                      
                      {selectedService && platformsVisible && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <PlatformList selectedService={selectedService} />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                }
              />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/platform/:id" element={<PlatformDetails />} />
            </Routes>
          </main>
          
          <footer className="bg-gray-800/50 backdrop-blur-lg border-t border-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">About Sentify</h3>
                  <p className="text-gray-400">
                    Advanced sentiment analysis platform helping businesses understand their audience better.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                  <div className="flex flex-col space-y-2">
                    <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                      About Us
                    </Link>
                    <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                      Contact
                    </Link>
                    <a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                      Privacy Policy
                    </a>
                    <a href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                      Terms of Service
                    </a>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Connect</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://twitter.com/sentify" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-700 hover:bg-blue-500 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://github.com/yourusername/sentify" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-400">
                  &copy; {new Date().getFullYear()} Sentify. All rights reserved.
                </p>
                <p className="mt-4 sm:mt-0 text-gray-500">
                  Made with ❤️ for better insights
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
};

export default App;