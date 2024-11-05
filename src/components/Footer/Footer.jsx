import React from "react";
import "./Footer.css";
import githubIcon from "../../assets/github-tinyd.png";
import facebookIcon from "../../assets/facebook-tinyd.png";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">© 2024 Supersite, Powered by News API</p>
      <div className="footer__social">
        <nav className="footer__nav">
        <a href="/" className="footer__link">
            Home
          </a>
          <a href="https://tripleten.com/" target="_blank" rel="noopener noreferrer" className="footer__link">
            TripleTen
          </a>
        </nav>
        <div className="footer__media">
        <a href="https://github.com" target="_blank">
            <img src={githubIcon} className="footer__github-icon" alt="GitHub" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookIcon} className="footer__fb-icon" alt="Facebook" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
