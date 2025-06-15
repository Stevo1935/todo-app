function ErrorTest() {
  throw new Error("Test error for ErrorBoundary");
  return null;
}

export default ErrorTest;
