import React from 'react';
import "@/assets/error.css";
import Link from 'next/link';

const ErrorHandler = ({ error }: {error: Error}) => {
  console.log(error);
  return (

    <html lang="en">

      <body>
        <div className="error-container">
          <h1>404</h1>
          <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
          <p>{error.message}</p>
          <Link href="/">Return to Sign In</Link>
        </div>
      </body>
    </html>

  );
};

export default ErrorHandler;
