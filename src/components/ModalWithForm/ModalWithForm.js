import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  name,
  onSubmit,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__button-close"
          type="button"
          onClick={onClose}
        />
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button className="modal__button-submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
