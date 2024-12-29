import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
      <div className="flex space-x-4">
        <Link
          to="/add-category"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Category
        </Link>
        <Link
          to="/categories"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Categories
        </Link>
        <Link
          to="/add-car"
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Add Car
        </Link>
        <Link
          to="/cars"
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          View Cars
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
