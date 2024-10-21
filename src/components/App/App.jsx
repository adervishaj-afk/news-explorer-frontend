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
import { Link, useLocation } from "react-router-dom";

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
  const showMoreArticles = () => {
    setVisibleArticles((prev) => prev + 3);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) return;

    // Validate the token and get user info
    auth
      .getUserInfo(token)
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data);
        navigate("/profile");
      })
      .catch((err) => {
        console.error(err);
        removeToken();
      });
  }, [isLoggedIn]);

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
          setIsLoggedIn(true);
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
    // console.log(article);
    const articleId = generateArticleId(article);
    article.articleId = articleId;
    // console.log(article.articleId);

    // Attach the keywords (from searchQuery) to the article
    article.keywords = searchQuery.split(" "); // Split search query into individual keywords

    // console.log("Article with attached keywords:", article.keywords.slice(0,2)); // Log the article with keywords for confirmation

    auth
      .likeArticle(article, token) // Pass the articleId and article object to the API
      .then((likedArticle) => {
        setSavedArticles([...savedArticles, likedArticle]); // Add saved article to state
      })
      .catch(console.error);
  };

  const handleCardDelete = (article) => {
    const token = getToken();
    if (!token) return;

    const articleId = article._id;

    auth
      .dislikeArticle(articleId, token)
      .then(() => {
        setSavedArticles((prevArticles) =>
          prevArticles.filter((a) => a._id !== articleId)
        );
      })
      .catch(console.error);
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

      console.log("Fetched articles for query:", news); // Log fetched articles to ensure data is coming through

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
    <>
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
                    {userData._id ? (
                      <Profile
                        articles={savedArticles}
                        onCardDelete={handleCardDelete}
                        isLoggedIn={isLoggedIn}
                        userData={userData} // Pass userData to Profile component
                        savedArticles={savedArticles}
                      />
                    ) : (
                      <div>Loading profile...</div> // Show loading state while fetching userData
                    )}
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
          </div>

          <Footer />
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
    </>
  );
}

export default App;
