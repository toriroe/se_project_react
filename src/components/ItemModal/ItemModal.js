import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, handleDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;
  console.log(selectedCard);
  console.log(currentUser);
  const itemDeleteButtonClass = `modal__button-delete ${
    isOwn ? "modal__button-delete_visible" : "modal__button-delete_hidden"
  }`;

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
              className={itemDeleteButtonClass}
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
