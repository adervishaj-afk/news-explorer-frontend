import { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm";

const LoginModal = ({
  handleLogin,
  isOpen,
  closeActiveModal,
  handleSignup,
  handleOutsideClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state when request is sent
    setErrorMessage('');

    try {
      await handleLogin(data);  // Call the handleLogin function from props
      setIsLoading(false);
    } catch (err) {
      setErrorMessage('Failed to sign in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      handleOutsideClick={handleOutsideClick}
    >
      <label htmlFor="username" className="signin-label">
        Email
      </label>
      <input
        id="email"
        required
        name="email"
        type="text"
        value={data.username}
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
      <div>
        <div className="action-buttons">
          <button className="signin-button" type="submit">
            Sign in
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
