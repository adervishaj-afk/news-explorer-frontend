import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Results from "../Results/Results";
import Footer from "../Footer/Footer";
import LoginModal from "../ModalWithForm/LoginModal/LoginModal";
import RegisterModal from "../ModalWithForm/RegisterModal/RegisterModal";
import { getNews } from "../../utils/ThirdPartyApi";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getToken, setToken, removeToken } from "../../utils/token";
import { api } from "../../utils/ThirdPartyApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { auth } from "../../utils/auth";
import Profile from "../Profile/Profile";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    email: "",
  });
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [uniqueKeywords, setUniqueKeywords] = useState([]);
  const showMoreArticles = () => {
    setVisibleArticles((prev) => prev + 3);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      auth
        .getUserInfo(token)
        .then((user) => {
          setUserData(user);
          setIsLoggedIn(true); // Ensure `isLoggedIn` is true
          return auth.getSavedArticles(token); // Fetch saved articles immediately
        })
        .then((articles) => {
          setSavedArticles(articles); // Update savedArticles state

          // Extract unique keywords directly from fetched articles
          const allKeywords = articles.flatMap(
            (article) => article.keywords || []
          );
          setUniqueKeywords(Array.from(new Set(allKeywords))); // Update uniqueKeywords state
        })
        .catch((err) => {
          console.error("Error:", err);
          setIsLoggedIn(false); // Ensure state is consistent
        });
    }
  }, []);

  useEffect(() => {
    // Recalculate unique keywords whenever savedArticles changes
    const allKeywords = savedArticles.flatMap(
      (article) => article.keywords || []
    );
    setUniqueKeywords(Array.from(new Set(allKeywords))); // Update uniqueKeywords state
  }, [savedArticles]); // Dependency array ensures this runs whenever savedArticles changes

  // Handle user registration
  const handleRegistration = ({ username, email, password }) => {
    auth
      .signup(username, email, password)
      .then(() => {
        setActiveModal("sign-in");
      })
      .catch((err) => console.error(err));
  };

  // Handle user login
  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

    auth
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          // Fetch user data immediately after setting the token
          return auth.getUserInfo(data.token);
        }
      })
      .then((userInfo) => {
        if (userInfo) {
          setUserData(userInfo); // Set user data after fetching it
          setIsLoggedIn(true); // Set logged-in status only after user data is available
          closeActiveModal();
          navigate("/profile");
        }
      })
      .catch(console.error);
  };

  // Handle logout
  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const generateArticleId = (article) => {
    return encodeURIComponent(
      `${article?.title}-${article?.publishedAt}-${article?.sourceName}`
    );
  };

  // Handle saving (liking) articles
  const handleCardLike = (article) => {
    const token = getToken();
    if (!token) return;

    const articleId = generateArticleId(article);
    article.articleId = articleId;

    // Attach the keywords (from searchQuery) to the article
    article.keywords = searchQuery.split(" "); // Split search query into individual keywords

    // Make an API request to add the article, checking if it already exists on the server
    auth
      .likeArticle(article, token)
      .then((likedArticle) => {
        // Add saved article to state if it was successfully added on the backend
        setSavedArticles((prevArticles) => {
          const isAlreadySaved = prevArticles.some(
            (savedArticle) => savedArticle.articleId === likedArticle.articleId
          );
          // Avoid duplicate entries in the frontend state
          return isAlreadySaved
            ? prevArticles
            : [...prevArticles, likedArticle];
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          console.log("Article already exists in the database.");
        } else {
          console.error("Error in handleCardLike:", err);
        }
      });
  };

  // // Handle saving (liking) articles
  // const handleCardLike = (article) => {
  //   const token = getToken();
  //   if (!token) return;
  //   // console.log(article);
  //   const articleId = generateArticleId(article);
  //   article.articleId = articleId;
  //   // console.log(article.articleId);

  //   // Attach the keywords (from searchQuery) to the article
  //   article.keywords = searchQuery.split(" "); // Split search query into individual keywords

  //   // console.log("Article with attached keywords:", article.keywords.slice(0,2)); // Log the article with keywords for confirmation

  //   auth
  //     .likeArticle(article, token) // Pass the articleId and article object to the API
  //     .then((likedArticle) => {
  //       setSavedArticles([...savedArticles, likedArticle]); // Add saved article to state
  //     })
  //     .catch(console.error);
  // };

  const handleCardDelete = (article) => {
    const token = getToken();
    if (!token) return;

    // Find the matching article in savedArticles by comparing URLs
    const savedArticle = savedArticles.find(
      (saved) => saved.url === article.url
    );

    if (savedArticle) {
      const articleId = savedArticle._id; // Use MongoDB _id from savedArticles

      // Call the backend to delete the article by its _id
      auth
        .deleteArticle(articleId, token) // API call to delete the article by _id
        .then(() => {
          console.log("Article deleted:", articleId);
          // Remove the article from savedArticles state
          setSavedArticles((prevArticles) =>
            prevArticles.filter((a) => a._id !== articleId)
          );
        })
        .catch((error) => {
          console.error("Error deleting article:", error);
        });
    } else {
      console.log("No matching saved article found for deletion.");
    }
  };

  const handleSignin = () => {
    setActiveModal("sign-in");
  };

  const handleSignup = () => {
    setActiveModal("sign-up");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && activeModal) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeActiveModal();
    }
  };

  // Handle search logic
  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setError("Please enter a keyword");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsSubmitted(true);
    setSearchQuery(searchQuery);

    console.log("Search query captured:", searchQuery);

    try {
      const news = await getNews(searchQuery);

      setArticles(news);
      if (news.length === 0) {
        setError("No articles found for this query.");
      }
    } catch (err) {
      setError("Sorry, something went wrong during the request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CurrentUserContext.Provider value={{userData}}>
    <div className="page">
      <div className="page__content">
        <div className="page__style">
          <Header
            handleSignIn={handleSignin}
            handleSignup={handleSignup}
            onClose={closeActiveModal}
            isOpen={activeModal === "sign-in"}
            isModalOpen={isModalOpen}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Main
                    handleSearch={handleSearch}
                    isSubmitted={isSubmitted}
                    isLoading={isLoading}
                    error={error}
                    articles={articles}
                  />
                  {isSubmitted && (
                    <Results
                      showMoreArticles={showMoreArticles}
                      visibleArticles={visibleArticles}
                      isLoading={isLoading}
                      error={error}
                      articles={articles}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      savedArticles={savedArticles}
                      searchQuery={searchQuery}
                      isLoggedIn={isLoggedIn}
                      handleSignin={handleSignin}
                      // handleToggleBookmark={handleToggleBookmark}
                    />
                  )}
                  <About />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    articles={savedArticles}
                    onCardDelete={handleCardDelete}
                    isLoggedIn={isLoggedIn}
                    savedArticles={savedArticles}
                    uniqueKeywords={uniqueKeywords}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/profile" />
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
      {activeModal === "sign-in" && (
        <LoginModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "sign-in"}
          handleSignup={handleSignup}
          handleOutsideClick={handleOutsideClick}
          handleLogin={handleLogin}
        />
      )}
      {activeModal === "sign-up" && (
        <RegisterModal
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "sign-up"}
          handleSignin={handleSignin}
          handleOutsideClick={handleOutsideClick}
          isModalOpen={isModalOpen}
          handleRegistration={handleRegistration}
        />
      )}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
