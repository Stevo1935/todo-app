import React from "react";

const ErrorTest: React.FC = () => {
  throw new Error("Test error for ErrorBoundary");
  return null;
};

export default ErrorTest;
