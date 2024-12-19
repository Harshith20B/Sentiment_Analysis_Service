import img1 from '../assets/1.jpeg';
import img2 from '../assets/2.jpeg';
import img3 from '../assets/3.jpeg';

const AboutUs = () => {
  return (
    <div className="p-6 bg-gray-900">
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-gray-100 text-center">About Us</h2>
        <p className="text-lg mb-8 text-gray-300 text-center max-w-3xl mx-auto">
          Sentify is a platform that helps users analyze the sentiment of different service platforms across various industries. Our goal is to provide insights into customer feedback, helping businesses improve their services.
        </p>
        
        <h3 className="text-2xl font-semibold mb-8 text-gray-100 text-center">Meet the Team</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
            <img
              src={img1}
              alt="Harshith Bezawada"
              className="w-32 h-32 mx-auto rounded-full mb-4 bg-gray-700"
            />
            <h4 className="text-xl font-semibold text-gray-100">Harshith Bezawada</h4>
            <p className="text-blue-400">ISE</p>
            <p className="text-gray-300 mt-2">
              Harshith is passionate about building user-friendly and responsive web applications. He loves bringing designs to life with React and Tailwind CSS.
            </p>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
            <img
              src={img2}
              alt="Abhishek V K"
              className="w-32 h-32 mx-auto rounded-full mb-4 bg-gray-700"
            />
            <h4 className="text-xl font-semibold text-gray-100">Abhishek V K</h4>
            <p className="text-blue-400">AI & DS</p>
            <p className="text-gray-300 mt-2">
              Abhishek specializes in backend development using Node.js and MongoDB. He ensures the platform runs smoothly and efficiently.
            </p>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
            <img
              src={img3}
              alt="Suhas S"
              className="w-32 h-32 mx-auto rounded-full mb-4 bg-gray-700"
            />
            <h4 className="text-xl font-semibold text-gray-100">Suhas S</h4>
            <p className="text-blue-400">ISE</p>
            <p className="text-gray-300 mt-2">
              Suhas focuses on the AI and data analysis part of Sentify. He builds the models for sentiment analysis and ensures the platform provides accurate insights.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
