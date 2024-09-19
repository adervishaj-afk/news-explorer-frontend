import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm";

const RegisterModal = ({
  handleLogin,
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
      <div>
        <div className="action-buttons">
          <button className="signin-button" type="submit">
            Sign up
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
