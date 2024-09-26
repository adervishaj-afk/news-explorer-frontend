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
    username: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
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
        id="username"
        required
        name="username"
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
