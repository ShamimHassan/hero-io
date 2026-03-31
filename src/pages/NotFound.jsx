import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <img src="/assets/error-404.png" alt="404 Error" className="w-64 md:w-80" />
        <div className="absolute inset-0 flex items-center justify-center -mt-8">
          <span className="text-8xl md:text-9xl font-black text-blue-600/10">404</span>
        </div>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
        Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
