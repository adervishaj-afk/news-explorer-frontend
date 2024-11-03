import "./ModalWithForm.css";
import React from "react";

function ModalWithForm({
  children,
  title,
  onClose,
  isOpen,
  onSubmit,
  handleOutsideClick,
}) {

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={onClose}
    >
      <div className="modal__content-form" onClick={(e) => e.stopPropagation()}>
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

export default ModalWithForm;
