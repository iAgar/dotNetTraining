import React from 'react';
import './WelcomePage.css'; 

function WelcomePage() {
  return (
    <div className="welcome-container">
      <header>
        <h1>Welcome to Zenith Bank</h1>
        <p>Your Trusted Banking Partner</p>
      </header>
      <main>
        <p>Secure, Simple, and Convenient Banking Services</p>
      </main>
      <footer>
        <p>&copy; 2023 Zenith Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WelcomePage;