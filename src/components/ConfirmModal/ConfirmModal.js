import "./ConfirmModal.css";

const ConfirmModal = ({ selectedCard, onClose, handleDeleteItem }) => {
  return (
    <div className="modal">
      <div className="modal__content-confirm">
        <button
          className="modal__button-close-confirm"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal__confirm-text-container">
          <p className="modal__confirm-text">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__confirm-text">This action is irreversible.</p>
        </div>
        <button
          className="modal__button-delete-confirm"
          type="button"
          onClick={() => {
            handleDeleteItem(selectedCard);
          }}
        >
          Yes, delete item
        </button>
        <button
          className="modal__button-delete-cancel"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
