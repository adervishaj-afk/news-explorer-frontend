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
  // Check if the article is already saved based on its generated ID
  const isArticleSaved = savedArticles?.some(
    (savedArticle) => savedArticle.articleId === article.articleId
  );

  // Local state to manage the saved status of the article
  const [isSaved, setIsSaved] = useState(isArticleSaved);

  // Effect to update the saved status if the savedArticles prop changes
  useEffect(() => {
    setIsSaved(isArticleSaved);
  }, [isArticleSaved, savedArticles]);

  const handleBookmarkClick = () => {
    if (!isLoggedIn) {
      // If the user is not logged in, open the sign-in modal
      handleSignin();
      return;
    }

    if (isSaved) {
      // If the article is saved, call onCardDelete using the article
      onCardDelete(article);
    } else {
      // Otherwise, save the article by calling onCardLike using the article object
      onCardLike(article);
    }
    // Toggle the saved state locally
    setIsSaved(!isSaved);
  };

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
        <button
          className={`news-card__bookmark ${isSaved ? "saved" : ""}`}
          onClick={handleBookmarkClick}
        >
        </button>
      </div>
      <p className="news-card__source">
        Source: {article?.source?.name ? article.source.name : "Unknown Source"}
      </p>
    </div>
  );
};

export default NewsCard;


// import React, { useState, useEffect } from "react";
// import "./NewCard.css";

// const NewsCard = ({
//   article,
//   onCardLike,
//   onCardDelete,
//   isLoggedIn,
//   savedArticles = [],
// }) => {

 

//   return (
//     <div className="news-card">
//       <img
//         src={article?.urlToImage}
//         alt={article?.title}
//         className="news-card__image"
//       />
//       <p className="news-card__date">
//         Date:{" "}
//         {article?.publishedAt
//           ? new Date(article.publishedAt).toLocaleDateString()
//           : "Unknown Date"}
//       </p>
//       <div className="news-card__content">
//         <h3 className="news-card__title">{article?.title}</h3>
//         <p className="news-card__description">{article?.description}</p>
//         <button
//           className={`news-card__bookmark ${isSaved ? "saved" : ""}`}
//           onClick={handleBookmarkClick}
//         >
//           {/* Icon or text based on save state */}
//         </button>
//       </div>
//       <p className="news-card__source">
//         Source: {article?.source?.name ? article.source.name : "Unknown Source"}
//       </p>
//     </div>
//   );
// };

// export default NewsCard;

