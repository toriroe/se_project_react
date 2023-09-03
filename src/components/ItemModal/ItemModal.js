import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, handleDeleteClick }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content-image">
        <button
          className="modal__button-close-image"
          type="button"
          onClick={onClose}
        ></button>
        <img className="modal__image" src={selectedCard.imageUrl} />
        <div className="modal__description">
          <div className="modal__description-wrapper">
            <p className="modal__item-name">{selectedCard.name}</p>
            <button
              className="modal__button-delete"
              type="button"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          </div>
          <p className="modal__item-weather">
            Weather type: {selectedCard.weather}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
