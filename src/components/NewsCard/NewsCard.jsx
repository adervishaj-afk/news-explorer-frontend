import React, { useState } from "react";
import "./NewCard.css";

const NewsCard = ({ article }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="news-card">
      <img
        src={article?.urlToImage}
        alt={article?.title}
        className="news-card__image"
      />
      <p className="news-card__date">
        Date:{" "}
        {article?.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString()
          : "Unknown Date"}
      </p>
      <div className="news-card__content">
        <h3 className="news-card__title">{article?.title}</h3>
        <p className="news-card__description">{article?.description}</p>
        <button className="news-card__bookmark"></button>
      </div>
      <p className="news-card__source">
        Source: {article?.source?.name ? article.source.name : "Unknown Source"}
      </p>
    </div>
  );
};

export default NewsCard;
