// WelcomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; 

function WelcomePage() {
  return (
    <div className="welcome-container">
      <header>
        <h1>Welcome to XYZ Bank</h1>
        <p>Your Trusted Banking Partner</p>
      </header>
      <main>
        <p>Secure, Simple, and Convenient Banking Services</p>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </main>
      <footer>
        <p>&copy; 2023 XYZ Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WelcomePage;