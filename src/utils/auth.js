import { BASE_URL } from "../utils/constants";

// Function to handle the server response
export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// Sign up user (register)
const signup = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }), // Sending name, email, and password
  }).then(handleServerResponse);
};

// Sign in user (login)
const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }), // Sending email and password
  }).then(handleServerResponse);
};

const getUserInfo = (token) => {
  // Send a GET request to /users/me
  return fetch(`${BASE_URL}/user/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

// const likeArticle = (articleId, token) => {
//   console.log("Sending likeArticle request with token:", token); // Add this for debugging
//   console.log("Article ID:", articleId); // Add this for debugging

//   return fetch(`${BASE_URL}/article/${articleId}/like`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`, // This must be the actual JWT token
//     },
//   }).then(handleServerResponse);
// };

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

  // Step 2: Convert the object to a JSON string
  const jsonBody = JSON.stringify(articleJson);

  return fetch(`${BASE_URL}/article/${article.articleId}/like`, {
    method: "POST", // Use PUT method to like the article
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Pass the token for authentication
    },
    body: jsonBody,
  }).then(handleServerResponse);
};

// Dislike (un-save) an article
const deleteArticle = (articleId, token) => {
  console.log("Delete Article Function Called with ID:", articleId);

  return fetch(`${BASE_URL}/article/${encodeURIComponent(articleId)}/delete`, {
    method: "DELETE", // Use DELETE method to remove the like
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Pass the token for authentication
    },
  }).then(handleServerResponse);
};

const getSavedArticles = (token) => {
  return fetch(`${BASE_URL}/article/saved`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleServerResponse);
};

export const auth = {
  signup,
  signin,
  getUserInfo,
  likeArticle,
  deleteArticle,
  getSavedArticles,
};
