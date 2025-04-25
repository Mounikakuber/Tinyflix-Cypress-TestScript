import React from 'react';

const LoadingSpinner = () => {
  return (
    <div 
      className="loading-spinner" 
      role="status"
      aria-label="Loading content"
    >
      <div className="spinner" aria-hidden="true"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner; 