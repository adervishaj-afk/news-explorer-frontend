import { BASE_URL } from "../utils/constants";

// Function to handle the server response
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// Reusable request function
const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

// Sign up user (register)
const signup = (name, email, password) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
};

// Sign in user (login)
const signin = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

// Get user info
const getUserInfo = (token) => {
  return request(`${BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Like (save) an article
const likeArticle = (article, token) => {
  const articleJson = {
    articleId: article.articleId,
    title: article.title,
    description: article.description,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
    sourceName: article.sourceName,
    keywords: article.keywords || [],
    url: article.url,
  };

  return request(`${BASE_URL}/article/${article.articleId}/like`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(articleJson),
  });
};

// Dislike (un-save) an article
const deleteArticle = (articleId, token) => {
  console.log("Delete Article Function Called with ID:", articleId);

  return request(
    `${BASE_URL}/article/${encodeURIComponent(articleId)}/delete`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get saved articles
const getSavedArticles = (token) => {
  return request(`${BASE_URL}/article/saved`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const auth = {
  signup,
  signin,
  getUserInfo,
  likeArticle,
  deleteArticle,
  getSavedArticles,
};
