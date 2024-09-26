import React, { useState } from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

const Main = ({ handleSearch}) => {
  return (
    <div className="main">
      <div className="main__content">
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm handleSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Main;
