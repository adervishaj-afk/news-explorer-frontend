import "./ModalWithForm.css";

function MobileModalSignin({
  children,
  title,
  onClose,
  isOpen,
  onSubmit,
  handleOutsideClick,
  handleSignin,
}) {
  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOutsideClick}
    >
      <div className="mobile__signin">
        <div className="mobile_signin_header">
          <p className="mobile__signin_header_logo">NewsExplorer</p>
          <button className="mobile__signin_header_close" onClick={onClose}></button>
        </div>
        <p className="mobile__signin-title">Home</p>
        <button className="mobile__signin-login_button" onClick={handleSignin}>Sign In</button>
      </div>
      <div className="modal__content-form">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__form-close"
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {/* <button type="submit" className="modal__submit">
            {buttonText}
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default MobileModalSignin;
