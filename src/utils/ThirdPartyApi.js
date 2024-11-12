const API_KEY = "dd695f0f3720453e9025323b3c051bb8";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2"  // Proxy URL for production
    : "https://newsapi.org/v2";  // Also using proxy URL for development

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// Function to fetch news articles based on search query
export const getNews = async (query) => {
  const endpoint = `${BASE_URL}/everything?q=${encodeURIComponent(
    query
  )}&apiKey=${API_KEY}&pageSize=100&from=${getFormattedDate(
    7
  )}&to=${getFormattedDate(0)}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch news articles");
    }

    const data = await response.json();

    // Map through the articles to extract the necessary fields
    const articles = data.articles.map((article) => ({
      sourceName: article.source.name,
      title: article.title,
      publishedAt: article.publishedAt,
      description: article.description,
      urlToImage: article.urlToImage,
      url: article.url,
    }));

    return articles;
  } catch (error) {
    throw error;
  }
};

// Helper function to format the date for API query (7 days ago)
const getFormattedDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

export const api = {
  getNews,
  getFormattedDate,
  formatDate,
};