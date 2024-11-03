import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

const Header = ({ handleSignIn, handleLogout, isLoggedIn, userData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuSignIn = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true);
    handleSignIn();
  };

  return (
    <header
      className={`header ${
        location.pathname === "/profile" ? "header__signed-in" : ""
      }`}
    >
      <div
        className={`header__logo ${
          location.pathname === "/profile" ? "header__logo-signed-in" : ""
        }`}
      >
        NewsExplorer
      </div>
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
          {!isLoggedIn ? (
            <button
              className="mobile__dropdown-signin_button"
              onClick={handleMenuSignIn}
            >
              Sign In
            </button>
          ) : (
            <>
              <button
                className="mobile__dropdown-saved_button"
                onClick={() => {
                  setIsMenuOpen(false);
                  // navigate to profile or saved articles
                }}
              >
                Saved Articles
              </button>
              <button
                className="mobile__dropdown-logout_button"
                onClick={handleLogout}
              >
                Log
                {/* Log out ({userData.username}) */}
              </button>
            </>
          )}
        </div>
      )}
      <nav className="header__nav">
        <Link to="/">
          <button className={`header__button-home ${
                    location.pathname === "/profile"
                      ? "header__button-home-signin"
                      : ""
                  }`}>Home</button>
        </Link>
        {!isLoggedIn ? (
          <button
            className="header__button-signin header__button-signin-outline"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        ) : (
          <>
            <div className="header__profile-options">
              <button
                className="header__button-saved"
                onClick={() => {
                  // navigate to profile or saved articles
                }}
              >
                <Link
                  to="/profile"
                  className={`profile-link ${
                    location.pathname === "/profile"
                      ? "profile-link__signin"
                      : ""
                  }`}
                >
                  Saved Articles
                </Link>
              </button>
              <button className={`header__button-logout ${
                    location.pathname === "/profile"
                      ? "header__button-logout-signin"
                      : ""
                  }`} onClick={handleLogout}>
                {/* Log out ({userData.username}) */}
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
