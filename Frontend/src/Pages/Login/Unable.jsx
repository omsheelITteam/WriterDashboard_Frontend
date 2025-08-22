import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Unable = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div
        className={`bg-white p-8 rounded-xl shadow-lg max-w-md w-full transform transition-all duration-700 ease-out
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce transition duration-500">🚫</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2 transition duration-500">Access Denied</h1>
          <p className="text-gray-600 mb-6 transition duration-500">
            Sorry, you do not have permission to view this page or perform this action.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unable;
