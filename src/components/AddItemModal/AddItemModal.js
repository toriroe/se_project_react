import "./AddItemModal.css";

const AddItemModal = () => {
  return (
    <div className="modal__form-content">
      <label>
        <p className="modal__input-title">Name</p>
        <input
          className="modal__form-input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
        />
      </label>
      <label>
        <p className="modal__input-title">Image</p>
        <input
          className="modal__form-input"
          type="url"
          name="link"
          minLength="1"
          maxLength="30"
          placeholder="Image URL"
        />
      </label>
      <p className="modal__radio-title">Select the weather type:</p>
      <div className="modal__radio-options">
        <div className="modal__radio-option">
          <input
            className="modal__radio-button"
            type="radio"
            id="hot"
            value="hot"
          />
          <label> Hot </label>
        </div>
        <div className="modal__radio-option">
          <input
            className="modal__radio-button"
            type="radio"
            id="warm"
            value="warm"
          />
          <label> Warm </label>
        </div>
        <div className="modal__radio-option">
          <input
            className="modal__radio-button"
            type="radio"
            id="Cold"
            value="cold"
          />
          <label> Cold </label>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
