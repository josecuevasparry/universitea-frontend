import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ 
  children, 
  fallback = <h1>Something went wrong.</h1> 
}) => {
  const [errorState, setErrorState] = useState({
    hasError: false,
    error: null,
    errorInfo: null
  });

  const resetError = () => {
    setErrorState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  const componentDidCatch = (error, errorInfo) => {
    console.error('Error Boundary caught:', error, errorInfo);
    setErrorState({
      hasError: true,
      error,
      errorInfo
    });
  };

  useEffect(() => {
    const errorHandler = (errorEvent) => {
      componentDidCatch(errorEvent.error, {
        componentStack: errorEvent.message
      });
    };

    const rejectionHandler = (promiseRejectionEvent) => {
      componentDidCatch(promiseRejectionEvent.reason, {
        componentStack: 'Unhandled promise rejection'
      });
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  if (errorState.hasError) {
    return (
      <div className="error-boundary">
        {typeof fallback === 'function' 
          ? fallback({ error: errorState.error, resetError }) 
          : fallback}
        
        {process.env.NODE_ENV === 'development' && (
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
            <summary>Error Details</summary>
            <p>{errorState.error?.toString()}</p>
            <p>{errorState.errorInfo?.componentStack}</p>
          </details>
        )}
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;