import React from "react";
import "./SavedCard.css"; 

const SavedCard = ({ article, onCardDelete, isLoggedIn }) => {
  const handleDeleteClick = () => {
    onCardDelete(article); 
  };

  // Format date for display in "Month Day, Year" format
  const displayDate = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  return (
    <div className="saved-card">
      <img
        src={article?.urlToImage}
        alt={article?.title}
        className="saved-card__image"
      />
      <p className="saved-card__date">{displayDate}</p>
      <div className="saved-card__content">
        <h3 className="saved-card__title">{article?.title}</h3>
        <p className="saved-card__description">{article?.description}</p>
        <button
          className="saved-card__remove-button"
          onClick={handleDeleteClick}
        >
        </button>
      </div>
      <p className="saved-card__source">
          {article?.sourceName || "Unknown Source"}
        </p>
    </div>
  );
};

export default SavedCard;