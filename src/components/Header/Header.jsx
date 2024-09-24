import React, {useState} from "react";
import "./Header.css";

const Header = ({ handleSignIn }) => {


  return (
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <button className="header__menu" onClick={handleSignIn}>
        <span className="header__menu-icon"></span>
      </button>
      {/* create a new menu icon button. invisible by default */}
      {/* set a click listener on menu icon, it should add a modifier to header__nav */}
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
