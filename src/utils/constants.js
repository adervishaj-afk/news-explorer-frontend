const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.newsexplore.twilightparadox.com"
    : "http://localhost:3001";


// Proxy URL for News API
const NEWS_API_URL = "https://nomoreparties.co/news/v2/everything";

export { BASE_URL, NEWS_API_URL };
