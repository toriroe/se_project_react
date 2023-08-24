import "./ModalWithForm.css";

const ModalWithForm = ({ children, buttonText, title, onClose, name }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form">{children}</form>
        <button className="modal__button-submit" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ModalWithForm;
