import React from 'react';

const SavedNewsHeader = ({ savedArticles }) => {
  const savedCount = savedArticles.length;

  return (
    <div className="saved-news-header">
      <h1>Saved Articles</h1>
      <p>You have {savedCount} saved articles</p>
    </div>
  );
};

export default SavedNewsHeader;