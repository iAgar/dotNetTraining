import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Create this CSS file for styling

function WelcomePage() {
  return (
    <div className="welcome-container">
      <header>
        <h1>Welcome to Zenith Bank</h1>
        <p>Your Trusted Banking Partner</p>
      </header>
      <main>
        <p>Secure, Simple, and Convenient Banking Services</p>
        <Link to="/SignIn">Log In</Link>
      </main>
      <footer>
        <p>&copy; 2023 Zenith Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WelcomePage;