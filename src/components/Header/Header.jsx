import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import UnionWhite from "../../assets/Union-white.png";
import UnionBlack from "../../assets/Union-black.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ handleSignIn, handleLogout, isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData } = useContext(CurrentUserContext);

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
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            className={`header__logo ${
              location.pathname === "/profile" ? "header__logo-signed-in" : ""
            }`}
          >
            NewsExplorer
          </span>
        </Link>
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
          <button
            className={`header__button-home ${
              location.pathname === "/profile"
                ? "header__button-home-signin"
                : ""
            }`}
          >
            Home
          </button>
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
                className={`header__button-saved ${
                  location.pathname === "/profile"
                    ? "header__button-saved-black"
                    : "header__button-saved-white"
                }`}
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
              <button
                className={`header__button-logout ${
                  location.pathname === "/profile"
                    ? "header__button-logout-black"
                    : "header__button-logout-white"
                }`}
                onClick={handleLogout}
              >
                <div className="logout">
                  <span
                    className={`logout-username ${
                      location.pathname === "/profile"
                        ? "logout-username-black"
                        : "logout-username-white"
                    }`}
                  >
                    {userData.name}
                  </span>
                  <img
                    src={
                      location.pathname === "/profile" ? UnionBlack : UnionWhite
                    }
                    alt="logout icon"
                    className={`logout-icon ${
                      location.pathname === "/profile"
                        ? "logout-icon-black"
                        : "logout-icon-white"
                    }`}
                  />
                </div>
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
