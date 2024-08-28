import React from 'react';
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <nav className="header__nav">
        <button className="header__button-home">Home</button>
        <button className="header__button-signin header__button-signin-outline">Sign in</button>
      </nav>
    </header>
  );
};

export default Header;