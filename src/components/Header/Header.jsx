import React, { useState } from "react";
import "./Header.css";

const Header = ({ handleSignIn, isOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuSignIn = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
    handleSignIn();
  };

  return (
    // <header className={`header ${isModalOpen ? 'header--hidden': ''}`}>
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <button className="header__menu" onClick={toggleMenu}></button>
      {isMenuOpen && (
        <div className="mobile__dropdown">
          <div className="mobile_dropdown_header">
            <p className="mobile__dropdown_header_logo">NewsExplorer</p>
            <button
              className="mobile__dropdown_header_close"
              onClick={() => setIsMenuOpen(false)}
            ></button>
          </div>
          <p className="mobile__dropdown-title">Home</p>
          <button
            className="mobile__dropdown-signin_button"
            onClick={handleMenuSignIn}
          >
            Sign In
          </button>
        </div>
      )}
      <nav className="header__nav">
        <button className="header__button-home">Home</button>
        <button
          className="header__button-signin header__button-signin-outline"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </nav>
    </header>
  );
};

export default Header;
