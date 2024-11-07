import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./Results.css";
import Preloader from "../Preloader/Preloader";
import notFound from "../../assets/not-found_v1.svg";

const Results = ({
  isLoading,
  error,
  articles,
  showMoreArticles,
  visibleArticles,
  onCardLike,
  onCardDelete,
  savedArticles,
  isLoggedIn,
  handleSignin,
  handleToggleBookmark,
}) => {
  if (isLoading) {
    return (
      <div className="results results__loading">
        <Preloader />
        <div>Searching for news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results">
        <img src={notFound} className="results-image"></img>
        <p>
          <span className="results-not-found-title">
            Sorry, something went wrong during the request.
          </span>
        </p>
        <span className="results-not-found-description">
          There may be a connection issue or the server may be down. Please try
          again later.
        </span>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="results">
        <img className="results-image"></img>
        <p>
          <span className="results-not-found-title">Nothing found.</span>
        </p>
        <span className="results-not-found-description">
          Sorry, but nothing matched your search terms.
        </span>
      </div>
    );
  }

  return (
    <div className="results-list">
      <div className="results-list__page-title">Search Results</div>
      <div className="results-list__cards">
        {articles.slice(0, visibleArticles).map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            savedArticles={savedArticles}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            isLoggedIn={isLoggedIn}
            handleSignin={handleSignin}
            handleToggleBookmark={handleToggleBookmark}
          />
        ))}
      </div>

      {visibleArticles < articles.length && (
        <button className="show-more" onClick={showMoreArticles}>
          Show More
        </button>
      )}
    </div>
  );
};

export default Results;
