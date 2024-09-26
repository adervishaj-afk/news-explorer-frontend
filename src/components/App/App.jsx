import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

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

function App() {
  const [activeModal, setActiveModal] = useState("");
  // const [savedArticles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignin = () => {
    setActiveModal("sign-in");
  };

  const handleSignup = () => {
    setActiveModal("sign-up");
  };

  const closeActiveModal = () => {
    setActiveModal("");
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
              onClose={closeActiveModal}
              isOpen={activeModal === "sign-in"}
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
          />
        )}
        {activeModal === "sign-up" && (
          <RegisterModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "sign-up"}
            handleSignin={handleSignin}
            handleOutsideClick={handleOutsideClick}
          />
        )}
      </div>
    </>
  );
}

export default App;
