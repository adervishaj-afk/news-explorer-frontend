import React, { useState, useEffect } from "react";
import "./NewCard.css";

const NewsCard = ({
  article,
  onCardLike,
  onCardDelete,
  isLoggedIn,
  savedArticles = [],
  handleSignin,
}) => {
  const isArticleSaved = savedArticles?.some(
    (savedArticle) => savedArticle.articleId === article.articleId
  );

  const [isSaved, setIsSaved] = useState(isArticleSaved);

  useEffect(() => {
    setIsSaved(isArticleSaved);
  }, [isArticleSaved, savedArticles]);

  const handleBookmarkClick = () => {
    if (!isLoggedIn) {
      handleSignin();
      return;
    }

    if (isSaved) {
      onCardDelete(article);
    } else {
      onCardLike(article);
    }
    setIsSaved(!isSaved);
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
    <div className="news-card">
      <img
        src={article?.urlToImage}
        alt={article?.title}
        className="news-card__image"
      />
      <p className="news-card__date">{displayDate}</p>
      <div className="news-card__content">
        <h3 className="news-card__title">{article?.title}</h3>
        <p className="news-card__description">{article?.description}</p>
        <button
          className={`news-card__bookmark ${isSaved ? "saved" : ""}`}
          onClick={handleBookmarkClick}
        ></button>
      </div>
      <p className="news-card__source">
        {article?.sourceName ? article.sourceName : "Unknown Source"}
      </p>
    </div>
  );
};

export default NewsCard;
