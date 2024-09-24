const API_KEY = "dd695f0f3720453e9025323b3c051bb8";
const BASE_URL = "https://newsapi.org/v2"; // Base URL for the News API

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
      publishedAt: formatDate(article.publishedAt),
      description: article.description,
      urlToImage: article.urlToImage,
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
