import React, { useState, useEffect } from "react";
import "./Profile.css";
import { auth } from "../../utils/auth"; // Import the function
import { getToken } from "../../utils/token"; // To get the token
import SavedCard from "../SavedCard/SavedCard";

const Profile = ({
  userData,
  handleCardClick,
  handleDeleteArticle,
  onCardLike,
  isLoggedIn,
  onCardDelete,
}) => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [uniqueKeywords, setUniqueKeywords] = useState([]);

  // Fetch saved articles when the component mounts
  useEffect(() => {
    const token = getToken();
    if (token) {
      auth
        .getSavedArticles(token)
        .then((articles) => {
          setSavedArticles(articles); // Set the articles in state

          // Extract all unique keywords from articles
          const allKeywords = articles.flatMap(
            (article) => article.keywords || []
          );
          const uniqueKeywords = Array.from(new Set(allKeywords));
          setUniqueKeywords(uniqueKeywords);
        })
        .catch((err) => {
          console.error("Error fetching saved articles:", err);
        });
    }
  }, []);

  // const renderKeywordsSummary = () => {
  //   if (uniqueKeywords.length === 0) {
  //     return "No keywords available";
  //   }
  //   if (uniqueKeywords.length <= 2) {
  //     return uniqueKeywords.join(", ");
  //   }
  //   return `${uniqueKeywords.slice(0, 2).join(", ")} and ${
  //     uniqueKeywords.length - 2
  //   } other${uniqueKeywords.length - 2 > 1 ? "s" : ""}`;
  // };

  // if (!savedArticles || savedArticles.length === 0) {
  //   return (
  //     <div className="profile">
  //       <h2>{userData.name}, you have not saved any articles yet.</h2>
  //     </div>
  //   );
  // }

  return (
    <div className="profile">
      <div>
        <p className="profile__label">Saved Articles</p>
        <h2 className="profile__title">
          {/* {userData.name}, you have {savedArticles.length} saved articles */}
        </h2>
        <div className="profile__keyword-search">
          By keywords:
          {/* <strong>{renderKeywordsSummary()}</strong> */}
        </div>
      </div>
      <ul className="saved-articles__list">
        {savedArticles.map((article, index) => (
          <li key={index} className="saved-articles__item">
            <SavedCard
              article={article}
              onCardClick={handleCardClick}
              handleDeleteArticle={handleDeleteArticle}
              onCardLike={onCardLike}
              isLiked={savedArticles.some((saved) => saved._id === article._id)}
              isLoggedIn={isLoggedIn}
              onCardDelete={onCardDelete}
            />
            {/* Display keywords associated with the article */}
            {/* <p className="article-keywords">Keywords: {article.keywords?.join(", ") || "No keywords"}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
