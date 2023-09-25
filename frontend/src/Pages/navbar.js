import React, { useState, useContext } from 'react';
import './navbar.css';
import { UserContext } from './userContext';
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const  isLoggedIn  = useContext(UserContext);

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
              {isLoggedIn ? (
                
                // Render links for logged-in users
                <>
                  {!isLoggedIn.user.isAdmin && (
                    <>
                    <Link to='/UserProfile' onClick={closeDropdown}>Dashboard</Link>
                      <Link to='/Txn' onClick={closeDropdown}>Make a Transaction</Link>
                      <Link  to='/ChangePin' onClick={closeDropdown}>Change PIN</Link>
                      <Link to='/ChequeDeposit' onClick={closeDropdown}>Cheque Deposit</Link>
                    </>
                  )}

                  {isLoggedIn.user.isAdmin && (
                    <>
                     <Link to='/AdminPostSignIn' onClick={closeDropdown}>Dashboard</Link>
                      <Link  to='/SignUp' onClick={closeDropdown}>Sign Up new User</Link>
                      <Link to='/CreateAccount' onClick={closeDropdown}>Create new Bank Account</Link>
                    </>
                  )}
                </>
              ) : (
                // Render links for non-logged-in users
                <>
                  <Link to="/SignIn" onClick={closeDropdown}>Login</Link>
                  <Link to="/" onClick={closeDropdown}>Home</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
