import React, { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">Zenith</div>
        <div className={`navbar-dropdown ${isDropdownOpen ? 'open' : ''}`}>
          <button className="navbar-button" onClick={toggleDropdown}>
            Menu
          </button>
          {isDropdownOpen && (
            <div className="navbar-links">
              <a href="#home" onClick={closeDropdown}>
                Home
              </a>
              <a href="#about" onClick={closeDropdown}>
                About
              </a>
              <a href="#services" onClick={closeDropdown}>
                Services
              </a>
              <a href="#contact" onClick={closeDropdown}>
                Contact
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
