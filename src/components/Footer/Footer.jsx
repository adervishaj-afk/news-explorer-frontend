import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">© 2024 Supersite, Powered by News API</p>
      <div className="footer__social">
        <nav className="footer__nav">
          <a href="/" className="footer__link">
            Home
          </a>
          <a href="/" className="footer__link">
            TripleTen
          </a>
        </nav>
        <img className="footer__github-icon"></img>
        <img className="footer__fb-icon"></img>
      </div>
    </footer>
  );
};

export default Footer;
