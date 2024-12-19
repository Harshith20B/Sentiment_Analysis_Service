import React, { useState } from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Mail, User, MessageSquare, Send, CheckCircle, XCircle } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormStatus('Your message has been sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const dismissStatus = () => {
    setFormStatus('');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <Card className="w-full max-w-lg bg-gray-800/70 shadow-xl backdrop-blur-md border border-gray-700 rounded-xl">
        <CardHeader className="space-y-2 text-center py-6">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Contact Us
          </div>
          <p className="text-gray-400 text-lg">
            We'd love to hear from you! Fill out the form below.
          </p>
        </CardHeader>
        <CardBody className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-700/50 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-700/50 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-gray-400 h-6 w-6" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="4"
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-700/50 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-lg font-semibold shadow-md transition-all hover:shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {formStatus && (
            <div
              className={`mt-6 flex items-center justify-between p-4 rounded-lg ${
                formStatus.includes('successfully')
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                {formStatus.includes('successfully') ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <XCircle className="h-6 w-6" />
                )}
                <span>{formStatus}</span>
              </div>
              <button
                onClick={dismissStatus}
                className="text-sm font-semibold text-gray-400 hover:text-gray-200 transition-colors"
              >
                Dismiss
              </button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactUs;
