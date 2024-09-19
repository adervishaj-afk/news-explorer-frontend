import React from 'react';
import NewsCardList from './NewsCardList';

const SavedNews = ({ savedArticles }) => {
  return (
    <div>
      <h2>Saved Articles</h2>
      <NewsCardList articles={savedArticles} />
    </div>
  );
};

export default SavedNews;