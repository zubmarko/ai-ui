import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">404 Not Found</h1>
        <p className="text-gray-600">The page you're looking for does not exist.</p>

        <Link to="/sign-in" className="text-blue-500 hover:text-blue-700">
          Go to Sign-In Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
