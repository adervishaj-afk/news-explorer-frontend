import React, { useState, useEffect } from "react";
import "./Profile.css";
import SavedCard from "../SavedCard/SavedCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({
  handleCardClick,
  handleDeleteArticle,
  onCardLike,
  isLoggedIn,
  onCardDelete,
  savedArticles,
  uniqueKeywords,
}) => {
  const { userData } = useContext(CurrentUserContext);

  const renderKeywordsSummary = () => {
    if (uniqueKeywords.length === 0) {
      return "No keywords available";
    }
    if (uniqueKeywords.length <= 2) {
      return uniqueKeywords.join(", ");
    }
    return `${uniqueKeywords.slice(0, 2).join(", ")} and ${
      uniqueKeywords.length - 2
    } other${uniqueKeywords.length - 2 > 1 ? "s" : ""}`;
  };

  if (!savedArticles || savedArticles.length === 0) {
    return (
      <div className="profile">
        <h2 className="profile__article-number">{userData.name}, you have not saved any articles yet.</h2>
      </div>
    );
  }


  return (
    <div className="profile">
      <div>
        <p className="profile__label">Saved Articles</p>
        <h2 className="profile__title">
          {userData.name}, you have {savedArticles.length} saved articles
        </h2>
        <div className="profile__keyword">
          By keywords: 
          <span className="profile__keyword-search">{ renderKeywordsSummary()}</span>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
