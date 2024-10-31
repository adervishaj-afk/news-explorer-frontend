const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.newsexplore.twilightparadox.com"
    : "http://localhost:3001";

export { BASE_URL };
