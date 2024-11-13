import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const LoginModal = ({
  handleLogin,
  isOpen,
  closeActiveModal,
  handleSignup,
  handleOutsideClick,
}) => {
  const { values, handleChange, errors, resetForm } = useFormAndValidation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await handleLogin(values);
      resetForm();
    } catch (err) {
      setErrorMessage("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error);

  return (
    <ModalWithForm
      title="Sign In"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      handleOutsideClick={handleOutsideClick}
    >
      <label htmlFor="email" className="signin-label">
        Email
      </label>
      <input
        id="email"
        required
        name="email"
        type="email"
        value={values.email || ""}
        onChange={handleChange}
        className={`signin-input ${errors.email ? "signin-input--error" : ""}`}
        placeholder="Email"
      />
      {errors.email && <span className="error-message">{errors.email}</span>}

      <label htmlFor="password" className="signin-label">
        Password
      </label>
      <input
        id="password"
        required
        name="password"
        type="password"
        minLength="3"
        value={values.password || ""}
        onChange={handleChange}
        className={`signin-input ${
          errors.password ? "signin-input--error" : ""
        }`}
        placeholder="Password"
      />
      {errors.password && (
        <span className="error-message">{errors.password}</span>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        <div className="action-buttons">
          <button
            className={`signin-button ${
              hasErrors ? "signin-button-disabled" : ""
            }`}
            type="submit"
            disabled={hasErrors}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <button
            onClick={handleSignup}
            type="button"
            className="login__signup"
          >
            or <span className="login__signup_text">Sign up</span>
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
