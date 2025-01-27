import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-9xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Oops!</h2>
        <p className="text-lg text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;