import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <div className="not-found" role="alert">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="notfound-link" href="/">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
