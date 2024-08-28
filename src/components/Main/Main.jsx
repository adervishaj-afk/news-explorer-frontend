import React from "react";
import "./Main.css";
import About from "../About/About";
import Navigation from "../Navigation/Navigation";

const Main = () => {
  return (
    <div className="main">
      <div className="main__content">
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        {/* <Navigation /> */}
        <div className="main__search-container">
          <input
            type="text"
            className="main__search-input"
            placeholder="Enter topic"
          />
          <button className="main__search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
