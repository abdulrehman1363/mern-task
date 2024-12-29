import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const StatisticsCard = ({ title, value, isLoading, error }) => {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-green-600">{value}</p>
      )}
    </div>
  );
};

export default StatisticsCard;
