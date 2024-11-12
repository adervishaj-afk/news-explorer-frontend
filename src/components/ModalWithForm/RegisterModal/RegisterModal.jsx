import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const RegisterModal = ({
  handleRegistration,
  isOpen,
  closeActiveModal,
  handleOutsideClick,
  handleSignin,
}) => {
  const { values, handleChange, errors, resetForm } = useFormAndValidation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await handleRegistration(values);
      setIsLoading(false);
      resetForm();
    } catch (err) {
      setErrorMessage("Failed to register. Please try again.");
      setIsLoading(false);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error);

  return (
    <ModalWithForm
      title="Sign Up"
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

      <label htmlFor="username" className="signin-label">
        Username
      </label>
      <input
        id="username"
        required
        name="username"
        type="text"
        minLength="3"
        value={values.username || ""}
        onChange={handleChange}
        className={`signin-input ${
          errors.username ? "signin-input--error" : ""
        }`}
        placeholder="Username"
      />
      {errors.username && (
        <span className="error-message">{errors.username}</span>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        <div className="action-buttons">
          <button
            className={`signin-button ${
              hasErrors || isLoading ? "signin-button-disabled" : ""
            }`}
            type="submit"
            disabled={hasErrors || isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
          <button
            onClick={handleSignin}
            type="button"
            className="login__signup"
          >
            or <span className="login__signup_text">Sign in</span>
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
