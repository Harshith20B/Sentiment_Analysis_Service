import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }
    setFormStatus('Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-6 bg-gray-900">
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-100 text-center">Contact Us</h2>
        <p className="text-lg mb-8 text-gray-300 text-center">Have questions or feedback? We're here to help!</p>
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-200 font-semibold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:border-blue-400 focus:ring focus:ring-blue-400/20"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-200 font-semibold mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:border-blue-400 focus:ring focus:ring-blue-400/20"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-200 font-semibold mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:border-blue-400 focus:ring focus:ring-blue-400/20"
                placeholder="Enter your message"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>

          {formStatus && (
            <div className={`mt-4 text-center text-lg font-semibold ${
              formStatus.includes('successfully') ? 'text-green-400' : 'text-red-400'
            }`}>
              {formStatus}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default ContactUs;
