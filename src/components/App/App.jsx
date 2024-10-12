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
import {auth} from "../../utils/auth"

function App() {
  const [activeModal, setActiveModal] = useState("");
  // const [savedArticles, setSavedArticles] = useState([]);
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

  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();

    if (!token) return;

    // Validate the token and get user info
    api
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

  // Handle profile update (like updating user email, etc.)
  const handleProfileUpdate = ({ name }) => {
    const token = getToken();
    api
      .editProfile({ name, token })
      .then((data) => {
        setUserData(data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Handle logout
  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  // Handle saving (liking) articles
  const handleCardLike = (article) => {
    const token = getToken();
    if (!token) return;

    api
      .saveArticle({ article, token })
      .then((savedArticle) => {
        setSavedArticles([...savedArticles, savedArticle]);
      })
      .catch(console.error);
  };

  // Handle deleting (unsaving) articles
  const handleCardDelete = (articleId) => {
    const token = getToken();
    if (!token) return;

    api
      .deleteArticle(articleId, token)
      .then(() => {
        setSavedArticles(
          savedArticles.filter((article) => article._id !== articleId)
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
            />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Main
                    handleSearch={handleSearch}
                    isSubmitted={isSubmitted}
                    isLoading={isLoading}
                    error={error}
                    articles={articles}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Results
                      articles={savedArticles}
                      onCardDelete={handleCardDelete}
                      isLoggedIn={isLoggedIn}
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
          </div>
          {isSubmitted && (
            <Results isLoading={isLoading} error={error} articles={articles} />
          )}
          <About />
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
