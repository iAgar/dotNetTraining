import React from 'react';
import './WelcomePage.css';
import img1 from './Images/img1.PNG' 
import img2 from './Images/img2.PNG' 
import img3 from './Images/img3.PNG' 

function WelcomePage() {
  return (
    <div className="welcome-container">
      <header>
        <h1>Welcome to Zenith Bank</h1>
        <p>Your Trusted Banking Partner</p>
      </header>
      <main>
        <section class="image-gallery">
            <div class="gallery-item">
                <img src={img1} alt="Image 1"></img>
            </div>
            <div class="gallery-item">
                <img src={img2} alt="Image 2"/>
            </div>
            <div class="gallery-item">
                <img src={img3} alt="Image 3"></img>
            </div>
        </section>
        <p>Secure, Simple, and Convenient Banking Services</p>
      </main>
      <footer>
        <p>&copy; 2023 Zenith Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WelcomePage;