import React from "react";
const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner" role="status">
      <div className="loading-spinner__spinner" aria-label="Loading..."></div>
    </div>
  );
};

export default LoadingSpinner;
