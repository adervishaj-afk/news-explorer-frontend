import React from "react";
import "./SavedCard.css"; // Assuming you will have a separate CSS file for SavedCards

const SavedCard = ({ article, onCardDelete, isLoggedIn }) => {
  const handleDeleteClick = () => {
    onCardDelete(article); // Call the delete function passed from props
    
  };

  return (
    <div className="saved-card">
      <img
        src={article?.urlToImage}
        alt={article?.title}
        className="saved-card__image"
      />
      <p className="saved-card__date">
        Date:{" "}
        {article?.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString()
          : "Unknown Date"}
      </p>
      <div className="saved-card__content">
        <h3 className="saved-card__title">{article?.title}</h3>
        <p className="saved-card__description">{article?.description}</p>
        <p className="saved-card__source">
          Source: {article?.sourceName || "Unknown Source"}
        </p>
        <button
          className="saved-card__remove-button"
          onClick={handleDeleteClick}
        >
        </button>
      </div>
    </div>
  );
};

export default SavedCard;