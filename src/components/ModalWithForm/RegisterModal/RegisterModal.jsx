import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm";

const RegisterModal = ({
  handleRegistration,  // Pass in the registration function from the parent
  isOpen,
  closeActiveModal,
  handleOutsideClick,
  handleSignin,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await handleRegistration(data);  // Call the handleRegistration function from props
      setIsLoading(false);
    } catch (err) {
      setErrorMessage('Failed to register. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign up"
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
        type="text"
        value={data.email}
        onChange={handleChange}
        className="signin-input"
        placeholder="Email"
      />
      <label htmlFor="password" className="signin-label">
        Password
      </label>
      <input
        id="password"
        required
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        className="signin-input"
        placeholder="Password"
      />
      <label htmlFor="username" className="signin-label">
        Username
      </label>
      <input
        id="username"
        required
        name="username"
        type="text"
        value={data.username}
        onChange={handleChange}
        className="signin-input"
        placeholder="Username"
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        <div className="action-buttons">
          <button className="signin-button" type="submit" disabled={isLoading}>
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